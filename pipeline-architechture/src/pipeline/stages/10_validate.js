/**
 * Validation stage - Validates input (prevents 180° reversals)
 * This is the second stage in the pipeline
 */
import { isValidDirectionChange } from '../shared/utils.js';

export class InputValidator {
    /**
     * @param {Function} onValidInput - Callback function for valid input
     */
    constructor(onValidInput) {
        this.onValidInput = onValidInput;
    }
    
    /**
     * Process input and validate it
     * @param {Object} input - Input event from source stage
     * @param {GameState} gameState - Current game state
     * @returns {GameState} Updated game state
     */
    process(input, gameState) {
        // Clone the game state to avoid direct mutation
        const newState = gameState.clone();
        
        // Handle different input types
        switch (input.type) {
            case 'direction':
                this.handleDirectionInput(input.direction, newState);
                break;
                
            case 'restart':
                this.handleRestartInput(newState);
                break;
        }
        
        // Pass the validated input to the next stage
        if (this.onValidInput) {
            this.onValidInput(input, newState);
        }
        
        return newState;
    }
    
    /**
     * Handle direction input
     * @param {string} direction - New direction
     * @param {GameState} gameState - Game state to update
     */
    handleDirectionInput(direction, gameState) {
        // Ignore input if game is over
        if (gameState.gameOver) {
            return;
        }
        
        // Validate direction change (prevent 180° reversals)
        if (isValidDirectionChange(gameState.direction, direction)) {
            gameState.nextDirection = direction;
        }
    }
    
    /**
     * Handle restart input
     * @param {GameState} gameState - Game state to update
     */
    handleRestartInput(gameState) {
        // Reset the game state
        gameState.snake = [];
        gameState.direction = 'right';
        gameState.nextDirection = 'right';
        gameState.score = 0;
        gameState.gameOver = false;
        
        // Initialize snake in the center of the grid
        const center = Math.floor(gameState.gridSize / 2);
        const initialLength = 3;
        
        for (let i = 0; i < initialLength; i++) {
            gameState.snake.unshift({ x: center - i, y: center });
        }
        
        // Generate new food
        gameState.generateFood();
    }
}