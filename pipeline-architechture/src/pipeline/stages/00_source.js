/**
 * Source stage - Captures user input (keyboard events)
 * This is the first stage in the pipeline
 */
import { isValidDirectionChange } from '../shared/utils.js';

export class InputSource {
    /**
     * @param {Function} onInput - Callback function for input events
     */
    constructor(onInput) {
        this.onInput = onInput;
        this.keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'KeyW': 'up',
            'KeyS': 'down',
            'KeyA': 'left',
            'KeyD': 'right'
        };
        
        // Bind event handlers
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleRestartClick = this.handleRestartClick.bind(this);
    }
    
    /**
     * Initialize event listeners
     */
    init() {
        // Add keyboard event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        
        // Add restart button event listener
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.addEventListener('click', this.handleRestartClick);
        }
    }
    
    /**
     * Clean up event listeners
     */
    cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown);
        
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.removeEventListener('click', this.handleRestartClick);
        }
    }
    
    /**
     * Handle keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyDown(event) {
        const direction = this.keyMap[event.code];
        
        if (direction) {
            this.onInput({
                type: 'direction',
                direction
            });
        }
    }
    
    /**
     * Handle restart button click
     */
    handleRestartClick() {
        this.onInput({
            type: 'restart'
        });
    }
    
    /**
     * Process the current game state
     * @param {GameState} gameState - Current game state
     * @returns {GameState} Updated game state
     */
    process(gameState) {
        // This stage doesn't modify the game state directly
        // It only captures input events and passes them to the next stage
        return gameState;
    }
}