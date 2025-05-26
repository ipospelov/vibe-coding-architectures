/**
 * Random generation utility functions
 */

/**
 * Generates a random integer between min (inclusive) and max (exclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} - Random integer
 */
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Generates a random position within the grid
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - Random position {x, y}
 */
export const getRandomPosition = (gridSize) => {
  return {
    x: getRandomInt(0, gridSize),
    y: getRandomInt(0, gridSize)
  };
};

/**
 * Generates a random position that doesn't overlap with any occupied positions
 * @param {number} gridSize - Size of the grid
 * @param {Array} occupiedPositions - Array of positions that are already occupied
 * @returns {Object|null} - Random unoccupied position or null if no positions available
 */
export const getRandomUnoccupiedPosition = (gridSize, occupiedPositions) => {
  // If all positions are occupied, return null
  if (occupiedPositions.length >= gridSize * gridSize) {
    return null;
  }
  
  let position;
  let isOccupied;
  
  // Keep generating positions until we find an unoccupied one
  do {
    position = getRandomPosition(gridSize);
    isOccupied = occupiedPositions.some(pos => 
      pos.x === position.x && pos.y === position.y
    );
  } while (isOccupied);
  
  return position;
};