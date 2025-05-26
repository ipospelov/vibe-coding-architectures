/**
 * Maze rendering functions
 */

import { COLORS } from '../../atoms/constants.js';

/**
 * Draws a maze wall
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} x - X coordinate of the cell
 * @param {number} y - Y coordinate of the cell
 * @param {number} cellSize - Size of each cell in pixels
 * @param {string} wallPosition - Position of the wall ('top', 'right', 'bottom', 'left')
 */
export const drawMazeWall = (context, x, y, cellSize, wallPosition) => {
  context.strokeStyle = COLORS.MAZE_WALL;
  context.lineWidth = 2;
  context.beginPath();
  
  switch (wallPosition) {
    case 'top':
      context.moveTo(x * cellSize, y * cellSize);
      context.lineTo((x + 1) * cellSize, y * cellSize);
      break;
    case 'right':
      context.moveTo((x + 1) * cellSize, y * cellSize);
      context.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
      break;
    case 'bottom':
      context.moveTo(x * cellSize, (y + 1) * cellSize);
      context.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
      break;
    case 'left':
      context.moveTo(x * cellSize, y * cellSize);
      context.lineTo(x * cellSize, (y + 1) * cellSize);
      break;
  }
  
  context.stroke();
};

/**
 * Draws the maze
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {Object[][]} maze - 2D array of maze cells
 * @param {number} cellSize - Size of each cell in pixels
 */
export const drawMaze = (context, maze, cellSize) => {
  if (!maze || maze.length === 0) return;
  
  const gridSize = maze.length;
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = maze[y][x];
      
      // Draw walls for this cell
      if (cell.topWall) {
        drawMazeWall(context, x, y, cellSize, 'top');
      }
      
      if (cell.rightWall) {
        drawMazeWall(context, x, y, cellSize, 'right');
      }
      
      if (cell.bottomWall) {
        drawMazeWall(context, x, y, cellSize, 'bottom');
      }
      
      if (cell.leftWall) {
        drawMazeWall(context, x, y, cellSize, 'left');
      }
    }
  }
};