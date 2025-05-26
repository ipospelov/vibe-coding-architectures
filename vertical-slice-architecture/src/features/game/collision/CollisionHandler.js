// Collision Handler
import { isPositionInArray } from '../../../shared_kernel/utils.js';

/**
 * Checks for collisions with walls or snake's own body
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if collision detected
 */
export function checkCollision(gameState) {
    // Get the snake's head
    const head = gameState.snake[0];
    
    // Check for boundary wall collision
    if (checkWallCollision(head, gameState.gridSize)) {
        return true;
    }
    
    // Check for maze wall collision
    if (checkMazeWallCollision(head, gameState.walls)) {
        return true;
    }
    
    // Check for self collision
    if (checkSelfCollision(head, gameState.snake)) {
        return true;
    }
    
    return false;
}

/**
 * Checks if the snake has collided with a wall
 * @param {Object} head - Snake's head position {x, y}
 * @param {number} gridSize - Size of the grid
 * @returns {boolean} True if wall collision detected
 */
function checkWallCollision(head, gridSize) {
    return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= gridSize ||
        head.y >= gridSize
    );
}

/**
 * Checks if the snake has collided with itself
 * @param {Object} head - Snake's head position {x, y}
 * @param {Array} snake - Array of snake segments {x, y}
 * @returns {boolean} True if self collision detected
 */
function checkSelfCollision(head, snake) {
    // Skip the head (index 0) when checking for collisions
    // Start from index 1 (first body segment)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

/**
 * Checks if the snake's head is at the same position as the food
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if food collision detected
 */
export function checkFoodCollision(gameState) {
    const head = gameState.snake[0];
    return head.x === gameState.food.x && head.y === gameState.food.y;
}

/**
 * Checks if the snake has collided with a maze wall
 * @param {Object} head - Snake's head position {x, y}
 * @param {Array} walls - Array of wall positions {x, y}
 * @returns {boolean} True if maze wall collision detected
 */
function checkMazeWallCollision(head, walls) {
    return walls.some(wall => wall.x === head.x && wall.y === head.y);
}