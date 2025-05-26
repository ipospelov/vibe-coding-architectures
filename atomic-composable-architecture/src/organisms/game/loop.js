/**
 * Game loop implementation
 */

import { DEFAULT_GAME_SPEED, GRID_SIZE, CELL_SIZE_PX } from '../../atoms/constants.js';
import { setupKeyboardControls } from '../../molecules/input/keyboard.js';
import { setupCanvas, clearCanvas, drawGrid } from '../../molecules/rendering/canvas.js';
import { drawSnake, drawFood, drawScore, drawGameOverOverlay } from '../../molecules/rendering/draw.js';
import { drawMaze } from '../../molecules/rendering/maze.js';
import { getMazeGrid } from '../../molecules/maze/state.js';
import { createGameState } from './state.js';

/**
 * Game controller that manages the game loop and rendering
 */
export const GameController = {
  // Properties
  gameState: null,
  canvas: null,
  context: null,
  animationFrameId: null,
  lastRenderTime: 0,
  gameSpeed: DEFAULT_GAME_SPEED,
  keyboardControls: null,
  
  /**
   * Initializes the game
   * @param {HTMLElement} container - Container element for the game
   * @param {number} gridSize - Size of the grid
   * @param {number} cellSize - Size of each cell in pixels
   * @param {number} gameSpeed - Game speed in milliseconds
   */
  init(container, gridSize = GRID_SIZE, cellSize = CELL_SIZE_PX, gameSpeed = DEFAULT_GAME_SPEED) {
    // Set up canvas
    const canvasSetup = setupCanvas(gridSize, cellSize);
    this.canvas = canvasSetup.canvas;
    this.context = canvasSetup.context;
    container.appendChild(this.canvas);
    
    // Initialize game state
    this.gameState = createGameState(gridSize);
    this.gameSpeed = gameSpeed;
    
    // Set up keyboard controls
    this.keyboardControls = setupKeyboardControls((direction) => {
      this.gameState.changeDirection(direction);
    });
    
    return this;
  },
  
  /**
   * Starts the game loop
   */
  start() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.lastRenderTime = 0;
    this.gameLoop(0);
    
    return this;
  },
  
  /**
   * Main game loop
   * @param {number} currentTime - Current timestamp
   */
  gameLoop(currentTime) {
    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    
    // Calculate time since last render
    const timeSinceLastRender = currentTime - this.lastRenderTime;
    
    // Process input
    this.keyboardControls.processInput();
    
    // Update game state at fixed intervals
    if (timeSinceLastRender > this.gameSpeed) {
      this.lastRenderTime = currentTime;
      
      // Update game state
      this.gameState.update();
      
      // Render the game
      this.render();
    }
  },
  
  /**
   * Renders the game
   */
  render() {
    const { canvas, context, gameState } = this;
    const { snake, food, maze, score, isGameOver } = gameState;
    
    // Clear canvas
    clearCanvas(context, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(context, GRID_SIZE, CELL_SIZE_PX);
    
    // Draw maze
    const mazeGrid = getMazeGrid(maze);
    drawMaze(context, mazeGrid, CELL_SIZE_PX);
    
    // Draw snake
    drawSnake(context, snake.segments, CELL_SIZE_PX);
    
    // Draw food
    drawFood(context, food.position, CELL_SIZE_PX);
    
    // Draw score
    drawScore(context, score, canvas.width);
    
    // Draw game over overlay if game is over
    if (isGameOver) {
      drawGameOverOverlay(context, score, canvas.width, canvas.height);
    }
  },
  
  /**
   * Resets the game
   */
  reset() {
    this.gameState.reset();
    return this;
  },
  
  /**
   * Cleans up resources
   */
  cleanup() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    if (this.keyboardControls) {
      this.keyboardControls.cleanup();
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
};

/**
 * Creates a new game controller instance
 * @param {HTMLElement} container - Container element for the game
 * @param {number} gridSize - Size of the grid
 * @param {number} cellSize - Size of each cell in pixels
 * @param {number} gameSpeed - Game speed in milliseconds
 * @returns {Object} - New game controller instance
 */
export const createGameController = (container, gridSize, cellSize, gameSpeed) => {
  return Object.create(GameController).init(container, gridSize, cellSize, gameSpeed);
};
