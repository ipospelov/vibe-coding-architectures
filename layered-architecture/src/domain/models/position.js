/**
 * Position class representing a point on the game grid
 */
export class Position {
  /**
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a new Position with the same coordinates
   * @returns {Position} A new Position instance
   */
  clone() {
    return new Position(this.x, this.y);
  }

  /**
   * Checks if this position is equal to another position
   * @param {Position} position - Position to compare with
   * @returns {boolean} True if positions are equal
   */
  equals(position) {
    return this.x === position.x && this.y === position.y;
  }
}