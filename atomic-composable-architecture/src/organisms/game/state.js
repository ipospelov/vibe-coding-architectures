/**
 * Game state management
 */

import { GRID_SIZE } from '../../atoms/constants.js';
import { createInitialSnakeState, getSnakePositions, getSnakeHead } from '../../molecules/snake/state.js';
import { moveSnake, growSnake, updateSnakeDirection } from '../../molecules/snake/movement.js';
import { createInitialFoodState, spawnFood, getFoodPosition } from '../../molecules/food/state.js';
import { checkWallCollision, checkSelfCollision, checkFoodCollision } from '../../atoms/collision.js';
import { checkMazeWallCollision } from '../../atoms/maze.js';
import { createInitialMazeState, getMazeGrid, regenerateMaze } from '../../molecules/maze/state.js';

/**
 * Game state object
 */
export const GameState = {
  // State properties
  snake: null,
  food: null,
  maze: null,
  score: 0,
  isGameOver: false,
  isPaused: false,
  
  /**
   * Initializes the game state
   * @param {number} gridSize - Size of the grid
   */
  init(gridSize = GRID_SIZE) {
    // Initialize maze
    this.maze = createInitialMazeState(gridSize);
    
    // Initialize snake
    this.snake = createInitialSnakeState(gridSize);
    
    // Initialize food
    const snakePositions = getSnakePositions(this.snake);
    const mazeGrid = getMazeGrid(this.maze);
    this.food = createInitialFoodState(gridSize, snakePositions, mazeGrid);
    
    // Reset other state
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
    
    return this;
  },
  
  /**
   * Updates the game state for one tick
   * @param {number} gridSize - Size of the grid
   * @returns {Object} - Updated game state
   */
  update(gridSize = GRID_SIZE) {
    if (this.isGameOver || this.isPaused) {
      return this;
    }
    
    // Get the current head position before moving
    const prevHead = getSnakeHead(this.snake);
    
    // Move the snake
    this.snake = moveSnake(this.snake);
    const head = getSnakeHead(this.snake);
    
    // Check for wall collision
    if (checkWallCollision(head, gridSize)) {
      this.isGameOver = true;
      return this;
    }
    
    // Check for maze wall collision
    const mazeGrid = getMazeGrid(this.maze);
    if (checkMazeWallCollision(head, prevHead, mazeGrid)) {
      this.isGameOver = true;
      return this;
    }
    
    // Check for self collision
    if (checkSelfCollision(this.snake.segments)) {
      this.isGameOver = true;
      return this;
    }
    
    // Check for food collision
    const foodPosition = getFoodPosition(this.food);
    if (checkFoodCollision(head, foodPosition)) {
      // Increment score
      this.score += 1;
      
      // Grow the snake
      this.snake = growSnake(this.snake);
      
      // Spawn new food
      const snakePositions = getSnakePositions(this.snake);
      const mazeGrid = getMazeGrid(this.maze);
      const newFoodPosition = spawnFood(gridSize, snakePositions, mazeGrid);
      
      // Update food state
      this.food = {
        ...this.food,
        position: newFoodPosition
      };
    }
    
    return this;
  },
  
  /**
   * Changes the snake's direction
   * @param {Object} direction - New direction vector
   */
  changeDirection(direction) {
    if (!this.isGameOver && !this.isPaused) {
      this.snake = updateSnakeDirection(this.snake, direction);
    }
    return this;
  },
  
  /**
   * Toggles the pause state
   */
  togglePause() {
    if (!this.isGameOver) {
      this.isPaused = !this.isPaused;
    }
    return this;
  },
  
  /**
   * Resets the game state
   * @param {number} gridSize - Size of the grid
   */
  reset(gridSize = GRID_SIZE) {
    // Generate a new maze when resetting
    this.maze = regenerateMaze(this.maze, gridSize);
    
    // Reset other state
    this.snake = createInitialSnakeState(gridSize);
    
    const snakePositions = getSnakePositions(this.snake);
    const mazeGrid = getMazeGrid(this.maze);
    this.food = createInitialFoodState(gridSize, snakePositions, mazeGrid);
    
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
    
    return this;
  }
};

/**
 * Creates a new game state instance
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - New game state instance
 */
export const createGameState = (gridSize = GRID_SIZE) => {
  return Object.create(GameState).init(gridSize);
};