import { Position } from './position.js';

/**
 * Food class representing the food item in the game
 */
export class Food {
  /**
   * @param {Position} position - Position of the food
   */
  constructor(position) {
    this.position = position;
  }

  /**
   * Generate a new food position that doesn't overlap with the snake or maze walls
   * @param {number} gridSize - Size of the game grid
   * @param {Snake} snake - The snake to avoid
   * @param {Maze} maze - The maze to avoid walls from
   * @returns {Food} A new Food instance
   */
  static generateRandom(gridSize, snake, maze) {
    let position;
    let attempts = 0;
    const maxAttempts = gridSize * gridSize; // Prevent infinite loop
    
    // Keep generating positions until we find one that doesn't overlap with the snake or walls
    do {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      position = new Position(x, y);
      attempts++;
      
      // If we've tried too many times, just find any non-snake position
      if (attempts > maxAttempts) {
        if (!snake.containsPosition(position)) {
          break;
        }
      }
    } while (snake.containsPosition(position) || (maze && maze.hasWallAt(position)));
    
    return new Food(position);
  }
}