import { Position } from './position.js';
import { Direction } from './direction.js';

/**
 * Snake class representing the player's snake
 */
export class Snake {
  /**
   * @param {Position[]} segments - Array of positions representing snake segments
   * @param {string} direction - Current direction of the snake
   */
  constructor(segments, direction) {
    this.segments = segments;
    this.direction = direction;
    this.growNextMove = false;
  }

  /**
   * Create a snake with default position and length
   * @param {number} gridSize - Size of the game grid
   * @param {number} initialLength - Initial length of the snake
   * @returns {Snake} A new Snake instance
   */
  static createDefault(gridSize, initialLength = 3) {
    // Start at the center of the grid
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);
    
    // Create segments from right to left (head is at index 0)
    const segments = [];
    for (let i = 0; i < initialLength; i++) {
      segments.push(new Position(centerX - i, centerY));
    }
    
    return new Snake(segments, Direction.RIGHT);
  }

  /**
   * Get the head position of the snake
   * @returns {Position} Head position
   */
  getHead() {
    return this.segments[0];
  }

  /**
   * Set the direction of the snake if it's a valid change
   * @param {string} newDirection - New direction
   * @returns {boolean} True if direction was changed
   */
  setDirection(newDirection) {
    if (Direction.isValidChange(this.direction, newDirection)) {
      this.direction = newDirection;
      return true;
    }
    return false;
  }

  /**
   * Move the snake in its current direction
   * @returns {Position} New head position
   */
  move() {
    const head = this.getHead();
    const delta = Direction.getDelta(this.direction);
    
    // Create new head position
    const newHead = new Position(
      head.x + delta.x,
      head.y + delta.y
    );
    
    // Add new head to the beginning of segments
    this.segments.unshift(newHead);
    
    // Remove tail unless snake is growing
    if (!this.growNextMove) {
      this.segments.pop();
    } else {
      this.growNextMove = false;
    }
    
    return newHead;
  }

  /**
   * Make the snake grow on its next move
   */
  grow() {
    this.growNextMove = true;
  }

  /**
   * Check if the snake collides with itself
   * @returns {boolean} True if snake collides with itself
   */
  checkSelfCollision() {
    const head = this.getHead();
    
    // Start from index 1 to skip the head
    for (let i = 1; i < this.segments.length; i++) {
      if (head.equals(this.segments[i])) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if the snake contains a position
   * @param {Position} position - Position to check
   * @returns {boolean} True if the snake contains the position
   */
  containsPosition(position) {
    return this.segments.some(segment => segment.equals(position));
  }
}