import { Snake } from './snake.js';
import { Food } from './food.js';
import { Maze } from './maze.js';

/**
 * GameState class representing the current state of the game
 */
export class GameState {
  /**
   * @param {number} gridSize - Size of the game grid
   * @param {Snake} snake - The player's snake
   * @param {Food} food - The current food item
   * @param {Maze} maze - The maze with walls
   * @param {number} score - Current score
   * @param {boolean} isGameOver - Whether the game is over
   */
  constructor(gridSize, snake, food, maze, score = 0, isGameOver = false) {
    this.gridSize = gridSize;
    this.snake = snake;
    this.food = food;
    this.maze = maze;
    this.score = score;
    this.isGameOver = isGameOver;
  }

  /**
   * Create a new game state with default values
   * @param {number} gridSize - Size of the game grid
   * @returns {GameState} A new GameState instance
   */
  static createNew(gridSize = 20) {
    const snake = Snake.createDefault(gridSize);
    const maze = Maze.generateRandom(gridSize);
    const food = Food.generateRandom(gridSize, snake, maze);
    return new GameState(gridSize, snake, food, maze);
  }

  /**
   * Check if a position is within the grid boundaries
   * @param {Position} position - Position to check
   * @returns {boolean} True if the position is within bounds
   */
  isWithinBounds(position) {
    return (
      position.x >= 0 &&
      position.x < this.gridSize &&
      position.y >= 0 &&
      position.y < this.gridSize
    );
  }

  /**
   * Update the game state for one tick
   * @returns {Object} Update result with information about what happened
   */
  update() {
    if (this.isGameOver) {
      return { gameOver: true };
    }

    // Move the snake
    const newHead = this.snake.move();
    
    // Check for wall collision with grid boundaries
    if (!this.isWithinBounds(newHead)) {
      this.isGameOver = true;
      return { gameOver: true, reason: 'wall' };
    }
    
    // Check for wall collision with maze walls
    if (this.maze.hasWallAt(newHead)) {
      this.isGameOver = true;
      return { gameOver: true, reason: 'maze' };
    }
    
    // Check for self collision
    if (this.snake.checkSelfCollision()) {
      this.isGameOver = true;
      return { gameOver: true, reason: 'self' };
    }
    
    // Check for food collision
    let foodEaten = false;
    if (newHead.equals(this.food.position)) {
      // Increase score
      this.score += 1;
      
      // Grow snake on next move
      this.snake.grow();
      
      // Generate new food (avoiding walls)
      this.food = Food.generateRandom(this.gridSize, this.snake, this.maze);
      
      foodEaten = true;
    }
    
    return {
      gameOver: false,
      foodEaten,
      score: this.score
    };
  }

  /**
   * Reset the game state to a new game
   */
  reset() {
    const newState = GameState.createNew(this.gridSize);
    this.snake = newState.snake;
    this.food = newState.food;
    this.maze = newState.maze; // New maze for each game
    this.score = 0;
    this.isGameOver = false;
  }
}