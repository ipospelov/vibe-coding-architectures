/**
 * Maze generation utility functions
 */

import { getRandomInt } from './random.js';

/**
 * Represents a cell in the maze
 * @typedef {Object} Cell
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {boolean} visited - Whether the cell has been visited during generation
 * @property {boolean} topWall - Whether the top wall exists
 * @property {boolean} rightWall - Whether the right wall exists
 * @property {boolean} bottomWall - Whether the bottom wall exists
 * @property {boolean} leftWall - Whether the left wall exists
 */

/**
 * Creates an initial cell with all walls intact
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Cell} - New cell
 */
export const createCell = (x, y) => {
  return {
    x,
    y,
    visited: false,
    topWall: true,
    rightWall: true,
    bottomWall: true,
    leftWall: true
  };
};

/**
 * Gets the neighbors of a cell that haven't been visited
 * @param {Cell[][]} grid - 2D array of cells
 * @param {Cell} cell - Current cell
 * @returns {Cell[]} - Array of unvisited neighbor cells
 */
export const getUnvisitedNeighbors = (grid, cell) => {
  const { x, y } = cell;
  const neighbors = [];
  const gridSize = grid.length;

  // Check top neighbor
  if (y > 0 && !grid[y - 1][x].visited) {
    neighbors.push(grid[y - 1][x]);
  }

  // Check right neighbor
  if (x < gridSize - 1 && !grid[y][x + 1].visited) {
    neighbors.push(grid[y][x + 1]);
  }

  // Check bottom neighbor
  if (y < gridSize - 1 && !grid[y + 1][x].visited) {
    neighbors.push(grid[y + 1][x]);
  }

  // Check left neighbor
  if (x > 0 && !grid[y][x - 1].visited) {
    neighbors.push(grid[y][x - 1]);
  }

  return neighbors;
};

/**
 * Removes the walls between two adjacent cells
 * @param {Cell} current - Current cell
 * @param {Cell} next - Next cell
 */
export const removeWallsBetween = (current, next) => {
  const dx = next.x - current.x;
  const dy = next.y - current.y;

  // Remove horizontal walls
  if (dx === 1) {
    // Next is to the right
    current.rightWall = false;
    next.leftWall = false;
  } else if (dx === -1) {
    // Next is to the left
    current.leftWall = false;
    next.rightWall = false;
  }

  // Remove vertical walls
  if (dy === 1) {
    // Next is below
    current.bottomWall = false;
    next.topWall = false;
  } else if (dy === -1) {
    // Next is above
    current.topWall = false;
    next.bottomWall = false;
  }
};

/**
 * Checks if a position collides with a maze wall
 * @param {Object} position - Position to check {x, y}
 * @param {Object} prevPosition - Previous position {x, y}
 * @param {Cell[][]} maze - 2D array of maze cells
 * @returns {boolean} - Whether there is a collision with a wall
 */
export const checkMazeWallCollision = (position, prevPosition, maze) => {
  // If position is outside the grid, it's a collision
  if (position.x < 0 || position.x >= maze.length || 
      position.y < 0 || position.y >= maze.length) {
    return true;
  }

  // Calculate direction of movement
  const dx = position.x - prevPosition.x;
  const dy = position.y - prevPosition.y;

  // Check if we're moving through a wall
  if (dx === 1 && maze[prevPosition.y][prevPosition.x].rightWall) {
    // Moving right through a right wall
    return true;
  } else if (dx === -1 && maze[prevPosition.y][prevPosition.x].leftWall) {
    // Moving left through a left wall
    return true;
  } else if (dy === 1 && maze[prevPosition.y][prevPosition.x].bottomWall) {
    // Moving down through a bottom wall
    return true;
  } else if (dy === -1 && maze[prevPosition.y][prevPosition.x].topWall) {
    // Moving up through a top wall
    return true;
  }

  return false;
};

/**
 * Creates a path from start to end in the maze
 * @param {Cell[][]} maze - 2D array of maze cells
 * @param {Object} start - Start position {x, y}
 * @param {Object} end - End position {x, y}
 */
export const createPath = (maze, start, end) => {
  // Simple implementation: just remove walls along a path
  // This ensures there's at least one valid path through the maze
  const path = [];
  let current = { x: start.x, y: start.y };
  
  while (current.x !== end.x || current.y !== end.y) {
    path.push({ ...current });
    
    // Move towards the end
    if (current.x < end.x) {
      maze[current.y][current.x].rightWall = false;
      maze[current.y][current.x + 1].leftWall = false;
      current.x += 1;
    } else if (current.x > end.x) {
      maze[current.y][current.x].leftWall = false;
      maze[current.y][current.x - 1].rightWall = false;
      current.x -= 1;
    } else if (current.y < end.y) {
      maze[current.y][current.x].bottomWall = false;
      maze[current.y + 1][current.x].topWall = false;
      current.y += 1;
    } else if (current.y > end.y) {
      maze[current.y][current.x].topWall = false;
      maze[current.y - 1][current.x].bottomWall = false;
      current.y -= 1;
    }
  }
  
  return path;
};