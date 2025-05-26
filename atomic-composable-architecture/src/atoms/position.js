/**
 * Position-related utility functions
 */

/**
 * Checks if two positions are equal
 * @param {Object} pos1 - First position {x, y}
 * @param {Object} pos2 - Second position {x, y}
 * @returns {boolean} - Whether the positions are equal
 */
export const arePositionsEqual = (pos1, pos2) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

/**
 * Calculates a new position based on current position and direction
 * @param {Object} position - Current position {x, y}
 * @param {Object} direction - Direction vector {x, y}
 * @returns {Object} - New position {x, y}
 */
export const calculateNextPosition = (position, direction) => {
  return {
    x: position.x + direction.x,
    y: position.y + direction.y
  };
};

/**
 * Gets the center position of the grid
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - Center position {x, y}
 */
export const getGridCenter = (gridSize) => {
  return {
    x: Math.floor(gridSize / 2),
    y: Math.floor(gridSize / 2)
  };
};

/**
 * Checks if a position is within grid bounds
 * @param {Object} position - Position to check {x, y}
 * @param {number} gridSize - Size of the grid
 * @returns {boolean} - Whether the position is within bounds
 */
export const isWithinBounds = (position, gridSize) => {
  return position.x >= 0 && 
         position.x < gridSize && 
         position.y >= 0 && 
         position.y < gridSize;
};