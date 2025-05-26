/**
 * Direction constants and utilities for snake movement
 */
export class Direction {
  static UP = 'UP';
  static DOWN = 'DOWN';
  static LEFT = 'LEFT';
  static RIGHT = 'RIGHT';

  /**
   * Get the opposite direction
   * @param {string} direction - Current direction
   * @returns {string} Opposite direction
   */
  static getOpposite(direction) {
    switch (direction) {
      case Direction.UP: return Direction.DOWN;
      case Direction.DOWN: return Direction.UP;
      case Direction.LEFT: return Direction.RIGHT;
      case Direction.RIGHT: return Direction.LEFT;
      default: throw new Error(`Invalid direction: ${direction}`);
    }
  }

  /**
   * Check if a direction change is valid (not a 180° reversal)
   * @param {string} currentDirection - Current direction
   * @param {string} newDirection - New direction
   * @returns {boolean} True if the direction change is valid
   */
  static isValidChange(currentDirection, newDirection) {
    return newDirection !== Direction.getOpposite(currentDirection);
  }

  /**
   * Get the position delta for a given direction
   * @param {string} direction - Direction
   * @returns {Object} Delta with x and y values
   */
  static getDelta(direction) {
    switch (direction) {
      case Direction.UP: return { x: 0, y: -1 };
      case Direction.DOWN: return { x: 0, y: 1 };
      case Direction.LEFT: return { x: -1, y: 0 };
      case Direction.RIGHT: return { x: 1, y: 0 };
      default: throw new Error(`Invalid direction: ${direction}`);
    }
  }
}