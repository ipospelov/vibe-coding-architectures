/**
 * Update stage - Updates game state (moves snake, handles collisions)
 * This is the third stage in the pipeline
 */
import { getNextPosition, isWithinBoundaries, isPositionInArray } from '../shared/utils.js';

export class GameUpdater {
    /**
     * @param {Function} onUpdate - Callback function for game updates
     */
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
    }
    
    /**
     * Process the game state update
     * @param {GameState} gameState - Current game state
     * @returns {GameState} Updated game state
     */
    process(gameState) {
        // Clone the game state to avoid direct mutation
        const newState = gameState.clone();
        
        // Skip update if game is over
        if (newState.gameOver) {
            return newState;
        }
        
        // Update direction from nextDirection
        newState.direction = newState.nextDirection;
        
        // Move the snake
        this.moveSnake(newState);
        
        // Check for collisions
        this.checkCollisions(newState);
        
        // Check if snake ate food
        this.checkFood(newState);
        
        // Notify the next stage
        if (this.onUpdate) {
            this.onUpdate(newState);
        }
        
        return newState;
    }
    
    /**
     * Move the snake based on current direction
     * @param {GameState} gameState - Game state to update
     */
    moveSnake(gameState) {
        const head = gameState.snake[0];
        const newHead = getNextPosition(head, gameState.direction);
        
        // Add new head to the beginning of the snake
        gameState.snake.unshift(newHead);
        
        // Remove the tail (unless the snake ate food, which is handled in checkFood)
        gameState.snake.pop();
    }
    
    /**
     * Check for collisions with walls or self
     * @param {GameState} gameState - Game state to update
     */
    checkCollisions(gameState) {
        const head = gameState.snake[0];
        
        // Check wall collision
        if (!isWithinBoundaries(head, gameState.gridSize)) {
            gameState.gameOver = true;
            return;
        }
        
        // Check self collision (skip the head)
        const body = gameState.snake.slice(1);
        if (isPositionInArray(head, body)) {
            gameState.gameOver = true;
        }
    }
    
    /**
     * Check if snake ate food
     * @param {GameState} gameState - Game state to update
     */
    checkFood(gameState) {
        const head = gameState.snake[0];
        
        // Check if head position matches food position
        if (gameState.food && head.x === gameState.food.x && head.y === gameState.food.y) {
            // Increase score
            gameState.score += 1;
            
            // Grow snake (add back the tail that was removed in moveSnake)
            const tail = gameState.snake[gameState.snake.length - 1];
            gameState.snake.push({ ...tail });
            
            // Generate new food
            gameState.generateFood();
        }
    }
}