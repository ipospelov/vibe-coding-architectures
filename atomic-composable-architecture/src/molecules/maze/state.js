/**
 * Maze state management
 */

import { createCell, getUnvisitedNeighbors, removeWallsBetween, createPath } from '../../atoms/maze.js';
import { getRandomInt } from '../../atoms/random.js';
import { getGridCenter } from '../../atoms/position.js';

/**
 * Creates an initial grid of cells for the maze
 * @param {number} gridSize - Size of the grid
 * @returns {Object[][]} - 2D array of cells
 */
export const createInitialGrid = (gridSize) => {
  const grid = [];
  
  // Create a grid of cells
  for (let y = 0; y < gridSize; y++) {
    const row = [];
    for (let x = 0; x < gridSize; x++) {
      row.push(createCell(x, y));
    }
    grid.push(row);
  }
  
  return grid;
};

/**
 * Generates a maze using the Depth-First Search algorithm
 * @param {number} gridSize - Size of the grid
 * @returns {Object[][]} - 2D array of cells representing the maze
 */
export const generateMaze = (gridSize) => {
  // Create initial grid
  const grid = createInitialGrid(gridSize);
  
  // Start at a random cell
  const startX = getRandomInt(0, gridSize);
  const startY = getRandomInt(0, gridSize);
  
  // Stack for backtracking
  const stack = [];
  
  // Mark the starting cell as visited
  grid[startY][startX].visited = true;
  stack.push(grid[startY][startX]);
  
  // Continue until the stack is empty
  while (stack.length > 0) {
    // Get the current cell
    const current = stack[stack.length - 1];
    
    // Get unvisited neighbors
    const neighbors = getUnvisitedNeighbors(grid, current);
    
    if (neighbors.length > 0) {
      // Choose a random neighbor
      const next = neighbors[getRandomInt(0, neighbors.length)];
      
      // Remove walls between current and next
      removeWallsBetween(current, next);
      
      // Mark the next cell as visited
      next.visited = true;
      
      // Add the next cell to the stack
      stack.push(next);
    } else {
      // Backtrack
      stack.pop();
    }
  }
  
  // Reset visited flags (they're only used for generation)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x].visited = false;
    }
  }
  
  // Create a path from center to a food position to ensure the game is playable
  const center = getGridCenter(gridSize);
  const foodX = getRandomInt(0, gridSize);
  const foodY = getRandomInt(0, gridSize);
  
  createPath(grid, center, { x: foodX, y: foodY });
  
  return grid;
};

/**
 * Creates the initial maze state
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - Initial maze state
 */
export const createInitialMazeState = (gridSize) => {
  return {
    grid: generateMaze(gridSize)
  };
};

/**
 * Gets the maze grid
 * @param {Object} mazeState - Maze state
 * @returns {Object[][]} - 2D array of cells representing the maze
 */
export const getMazeGrid = (mazeState) => {
  return mazeState.grid;
};

/**
 * Regenerates the maze
 * @param {Object} mazeState - Current maze state
 * @param {number} gridSize - Size of the grid
 * @returns {Object} - Updated maze state
 */
export const regenerateMaze = (mazeState, gridSize) => {
  return {
    ...mazeState,
    grid: generateMaze(gridSize)
  };
};