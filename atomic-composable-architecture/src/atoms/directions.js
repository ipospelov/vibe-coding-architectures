/**
 * Direction constants and utilities
 */

// Direction constants
export const DIRECTION = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

/**
 * Checks if a direction change is valid (prevents 180° reversals)
 * @param {Object} currentDirection - Current direction vector {x, y}
 * @param {Object} newDirection - New direction vector {x, y}
 * @returns {boolean} - Whether the direction change is valid
 */
export const isValidDirectionChange = (currentDirection, newDirection) => {
  // Opposite directions have x or y components that sum to zero
  return (currentDirection.x + newDirection.x !== 0) || 
         (currentDirection.y + newDirection.y !== 0);
};

/**
 * Gets the direction from a key code
 * @param {string} key - The key code
 * @param {Object} keys - Key mapping object
 * @returns {Object|null} - Direction vector or null if not a valid direction key
 */
export const getDirectionFromKey = (key, keys) => {
  if (keys.UP.includes(key)) return DIRECTION.UP;
  if (keys.DOWN.includes(key)) return DIRECTION.DOWN;
  if (keys.LEFT.includes(key)) return DIRECTION.LEFT;
  if (keys.RIGHT.includes(key)) return DIRECTION.RIGHT;
  return null;
};