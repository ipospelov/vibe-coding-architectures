// Scoring Handler
import { checkFoodCollision } from '../collision/CollisionHandler.js';
import { getRandomPosition } from '../../../shared_kernel/utils.js';
import { incrementScore } from '../../../shared_kernel/GameState.js';

/**
 * Handles food collision and scoring
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if food was eaten
 */
export function handleFoodCollision(gameState) {
    // Check if the snake's head collided with food
    if (checkFoodCollision(gameState)) {
        // Increment score
        incrementScore(gameState);
        
        // Set flag to grow snake
        gameState.ateFood = true;
        
        // Spawn new food
        spawnNewFood(gameState);
        
        return true;
    }
    
    return false;
}

/**
 * Spawns new food at a random position
 * @param {Object} gameState - Current game state
 */
function spawnNewFood(gameState) {
    // Generate random position for food that doesn't overlap with snake
    gameState.food = getRandomPosition(gameState.gridSize, gameState.snake);
}

/**
 * Gets the current score
 * @param {Object} gameState - Current game state
 * @returns {number} Current score
 */
export function getCurrentScore(gameState) {
    return gameState.score;
}