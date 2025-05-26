/**
 * Pipeline Runner - Wires all stages together and manages the game loop
 */
import { GameState } from './contracts/GameState.js';
import { InputSource } from './stages/00_source.js';
import { InputValidator } from './stages/10_validate.js';
import { GameUpdater } from './stages/20_update.js';
import { GameRenderer } from './stages/30_render.js';
import { GameSink } from './stages/40_sink.js';
import { createEventEmitter } from './shared/utils.js';

class PipelineRunner {
    constructor() {
        // Create event emitter for pipeline communication
        this.events = createEventEmitter();
        
        // Create game state
        this.gameState = new GameState({
            gridSize: 20,
            initialSnakeLength: 3,
            updateInterval: 150
        });
        
        // Create pipeline stages
        this.inputSource = new InputSource(this.handleInput.bind(this));
        this.inputValidator = new InputValidator(this.handleValidInput.bind(this));
        this.gameUpdater = new GameUpdater(this.handleGameUpdate.bind(this));
        this.gameRenderer = new GameRenderer(this.handleRender.bind(this));
        this.gameSink = new GameSink(this.handleComplete.bind(this));
        
        // Game loop variables
        this.gameLoopInterval = null;
        this.lastUpdateTime = 0;
        this.inputQueue = [];
    }
    
    /**
     * Initialize the game
     */
    init() {
        // Initialize stages
        this.inputSource.init();
        this.gameRenderer.init();
        
        // Start game loop
        this.startGameLoop();
        
        // Initial render
        this.gameRenderer.process(this.gameState);
    }
    
    /**
     * Start the game loop
     */
    startGameLoop() {
        // Clear any existing interval
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
        }
        
        // Start new interval
        this.gameLoopInterval = setInterval(() => {
            this.update();
        }, this.gameState.updateInterval);
    }
    
    /**
     * Stop the game loop
     */
    stopGameLoop() {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
            this.gameLoopInterval = null;
        }
    }
    
    /**
     * Handle input from source stage
     * @param {Object} input - Input event
     */
    handleInput(input) {
        // Queue the input for processing
        this.inputQueue.push(input);
    }
    
    /**
     * Handle validated input
     * @param {Object} input - Validated input
     * @param {GameState} state - Updated game state
     */
    handleValidInput(input, state) {
        // If input is restart, restart the game loop
        if (input.type === 'restart') {
            this.gameState = state;
            this.startGameLoop();
        } else {
            // Otherwise just update the state
            this.gameState = state;
        }
    }
    
    /**
     * Handle game update
     * @param {GameState} state - Updated game state
     */
    handleGameUpdate(state) {
        this.gameState = state;
        
        // If game is over, stop the game loop
        if (state.gameOver) {
            this.stopGameLoop();
        }
    }
    
    /**
     * Handle render completion
     * @param {GameState} state - Rendered game state
     */
    handleRender(state) {
        this.gameState = state;
    }
    
    /**
     * Handle pipeline completion
     * @param {GameState} state - Final game state
     */
    handleComplete(state) {
        this.gameState = state;
    }
    
    /**
     * Update the game state
     */
    update() {
        // Process any queued inputs
        while (this.inputQueue.length > 0) {
            const input = this.inputQueue.shift();
            this.gameState = this.inputValidator.process(input, this.gameState);
        }
        
        // Update game state
        this.gameState = this.gameUpdater.process(this.gameState);
        
        // Render game state
        this.gameState = this.gameRenderer.process(this.gameState);
        
        // Process final state
        this.gameState = this.gameSink.process(this.gameState);
    }
    
    /**
     * Clean up resources
     */
    cleanup() {
        this.stopGameLoop();
        this.inputSource.cleanup();
        this.gameRenderer.cleanup();
    }
}

// Create and initialize the pipeline
const pipeline = new PipelineRunner();

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    pipeline.init();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    pipeline.cleanup();
});