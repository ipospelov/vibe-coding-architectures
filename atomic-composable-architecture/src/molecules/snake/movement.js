/**
 * Snake movement logic
 */

import { calculateNextPosition } from '../../atoms/position.js';
import { isValidDirectionChange } from '../../atoms/directions.js';
import { getSnakeHead } from './state.js';

/**
 * Updates the snake's direction if the change is valid
 * @param {Object} snakeState - Current snake state
 * @param {Object} newDirection - New direction vector {x, y}
 * @returns {Object} - Updated snake state
 */
export const updateSnakeDirection = (snakeState, newDirection) => {
  // Only update direction if it's a valid change
  if (newDirection && isValidDirectionChange(snakeState.direction, newDirection)) {
    return {
      ...snakeState,
      direction: newDirection
    };
  }
  return snakeState;
};

/**
 * Moves the snake one step in its current direction
 * @param {Object} snakeState - Current snake state
 * @returns {Object} - Updated snake state with new position
 */
export const moveSnake = (snakeState) => {
  const head = getSnakeHead(snakeState);
  const newHead = calculateNextPosition(head, snakeState.direction);
  
  // Create new segments array with new head at the front
  const newSegments = [newHead, ...snakeState.segments];
  
  // If the snake is not growing, remove the tail
  if (!snakeState.growing) {
    newSegments.pop();
  }
  
  return {
    ...snakeState,
    segments: newSegments,
    growing: false // Reset growing flag after movement
  };
};

/**
 * Makes the snake grow on the next move
 * @param {Object} snakeState - Current snake state
 * @returns {Object} - Updated snake state with growing flag set
 */
export const growSnake = (snakeState) => {
  return {
    ...snakeState,
    growing: true
  };
};