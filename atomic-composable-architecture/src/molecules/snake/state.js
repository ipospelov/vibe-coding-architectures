/**
 * Snake state management
 */

import { INITIAL_SNAKE_LENGTH } from '../../atoms/constants.js';
import { DIRECTION } from '../../atoms/directions.js';
import { getGridCenter, calculateNextPosition } from '../../atoms/position.js';

/**
 * Creates the initial snake segments
 * @param {number} gridSize - Size of the grid
 * @returns {Array} - Array of initial snake segment positions
 */
export const createInitialSnake = (gridSize) => {
  const center = getGridCenter(gridSize);
  const segments = [];
  
  // Create snake segments starting from the center and extending left
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    segments.push({
      x: center.x - i,
      y: center.y
    });
  }
  
  return segments;
};

/**
 * Creates the initial snake state
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - Initial snake state
 */
export const createInitialSnakeState = (gridSize) => {
  return {
    segments: createInitialSnake(gridSize),
    direction: DIRECTION.RIGHT,
    growing: false
  };
};

/**
 * Gets all positions occupied by the snake
 * @param {Object} snakeState - Current snake state
 * @returns {Array} - Array of positions occupied by the snake
 */
export const getSnakePositions = (snakeState) => {
  return snakeState.segments;
};

/**
 * Gets the position of the snake's head
 * @param {Object} snakeState - Current snake state
 * @returns {Object} - Position of the snake's head
 */
export const getSnakeHead = (snakeState) => {
  return snakeState.segments[0];
};