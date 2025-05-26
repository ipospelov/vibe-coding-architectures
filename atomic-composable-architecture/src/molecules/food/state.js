/**
 * Food state management
 */

import { getRandomUnoccupiedPosition } from '../../atoms/random.js';
import { isWithinBounds } from '../../atoms/position.js';

/**
 * Creates the initial food state
 * @param {number} gridSize - Size of the grid
 * @param {Array} occupiedPositions - Positions that are already occupied
 * @returns {Object} - Initial food state
 */
export const createInitialFoodState = (gridSize, occupiedPositions, mazeGrid = null) => {
  return {
    position: spawnFood(gridSize, occupiedPositions, mazeGrid)
  };
};

/**
 * Spawns food at a random unoccupied position
 * @param {number} gridSize - Size of the grid
 * @param {Array} occupiedPositions - Positions that are already occupied
 * @returns {Object|null} - New food position or null if no positions available
 */
export const spawnFood = (gridSize, occupiedPositions, mazeGrid = null) => {
  // If no maze, use the original implementation
  if (!mazeGrid) {
    return getRandomUnoccupiedPosition(gridSize, occupiedPositions);
  }
  
  // Try to find a position that's not occupied and not inside a wall
  let position;
  let isValid = false;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops
  
  while (!isValid && attempts < maxAttempts) {
    position = getRandomUnoccupiedPosition(gridSize, occupiedPositions);
    
    if (!position) {
      return null; // No available positions
    }
    
    // Check if position is valid (not inside a wall)
    isValid = isValidFoodPosition(position, mazeGrid);
    attempts++;
  }
  
  return position;
};

/**
 * Checks if a position is valid for food placement (not inside a wall)
 * @param {Object} position - Position to check
 * @param {Object[][]} mazeGrid - 2D array of maze cells
 * @returns {boolean} - Whether the position is valid
 */
export const isValidFoodPosition = (position, mazeGrid) => {
  if (!mazeGrid || !isWithinBounds(position, mazeGrid.length)) {
    return true; // If no maze or position out of bounds, consider it valid
  }
  
  const cell = mazeGrid[position.y][position.x];
  
  // A position is valid if it's not surrounded by walls on all sides
  // This ensures the food is reachable
  const hasAccessibleNeighbor =
    !cell.topWall ||
    !cell.rightWall ||
    !cell.bottomWall ||
    !cell.leftWall;
  
  return hasAccessibleNeighbor;
};

/**
 * Gets the current food position
 * @param {Object} foodState - Current food state
 * @returns {Object} - Position of the food
 */
export const getFoodPosition = (foodState) => {
  return foodState.position;
};

/**
 * Updates the food position
 * @param {Object} foodState - Current food state
 * @param {Object} newPosition - New food position
 * @returns {Object} - Updated food state
 */
export const updateFoodPosition = (foodState, newPosition) => {
  return {
    ...foodState,
    position: newPosition
  };
};