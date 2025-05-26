/**
 * Canvas rendering utilities
 */

import { GRID_SIZE, CELL_SIZE_PX, COLORS } from '../../atoms/constants.js';

/**
 * Creates and sets up the game canvas
 * @param {number} gridSize - Size of the grid
 * @param {number} cellSize - Size of each cell in pixels
 * @returns {Object} - Canvas and context objects
 */
export const setupCanvas = (gridSize = GRID_SIZE, cellSize = CELL_SIZE_PX) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = gridSize * cellSize;
  canvas.height = gridSize * cellSize;
  
  // Add some basic styling
  canvas.style.border = '1px solid #000';
  canvas.style.backgroundColor = COLORS.BACKGROUND;
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  
  return { canvas, context };
};

/**
 * Clears the canvas
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
export const clearCanvas = (context, width, height) => {
  context.clearRect(0, 0, width, height);
};

/**
 * Draws the grid lines
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} gridSize - Size of the grid
 * @param {number} cellSize - Size of each cell in pixels
 */
export const drawGrid = (context, gridSize, cellSize) => {
  context.strokeStyle = COLORS.GRID;
  context.lineWidth = 0.5;
  
  // Draw vertical lines
  for (let i = 0; i <= gridSize; i++) {
    context.beginPath();
    context.moveTo(i * cellSize, 0);
    context.lineTo(i * cellSize, gridSize * cellSize);
    context.stroke();
  }
  
  // Draw horizontal lines
  for (let i = 0; i <= gridSize; i++) {
    context.beginPath();
    context.moveTo(0, i * cellSize);
    context.lineTo(gridSize * cellSize, i * cellSize);
    context.stroke();
  }
};