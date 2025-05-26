/**
 * Collision detection utility functions
 */

import { arePositionsEqual } from './position.js';

/**
 * Checks if a position collides with any segment in an array
 * @param {Object} position - Position to check {x, y}
 * @param {Array} segments - Array of positions to check against
 * @returns {boolean} - Whether there is a collision
 */
export const checkCollisionWithSegments = (position, segments) => {
  return segments.some(segment => arePositionsEqual(position, segment));
};

/**
 * Checks if a position is outside the grid boundaries
 * @param {Object} position - Position to check {x, y}
 * @param {number} gridSize - Size of the grid
 * @returns {boolean} - Whether the position is outside the grid
 */
export const checkWallCollision = (position, gridSize) => {
  return position.x < 0 || 
         position.x >= gridSize || 
         position.y < 0 || 
         position.y >= gridSize;
};

/**
 * Checks if the snake has collided with itself
 * @param {Array} snakeSegments - Array of snake segment positions
 * @returns {boolean} - Whether the snake has collided with itself
 */
export const checkSelfCollision = (snakeSegments) => {
  if (snakeSegments.length <= 1) {
    return false;
  }
  
  const head = snakeSegments[0];
  // Check collision with all segments except the head
  return checkCollisionWithSegments(head, snakeSegments.slice(1));
};

/**
 * Checks if the snake head has collided with food
 * @param {Object} snakeHead - Position of snake head {x, y}
 * @param {Object} foodPosition - Position of food {x, y}
 * @returns {boolean} - Whether the snake has eaten the food
 */
export const checkFoodCollision = (snakeHead, foodPosition) => {
  return arePositionsEqual(snakeHead, foodPosition);
};