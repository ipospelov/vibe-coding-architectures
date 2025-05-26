/**
 * Drawing functions for game elements
 */

import { COLORS } from '../../atoms/constants.js';

/**
 * Draws a cell at the specified position
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} cellSize - Size of each cell in pixels
 * @param {string} color - Fill color
 */
export const drawCell = (context, x, y, cellSize, color) => {
  context.fillStyle = color;
  context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  
  // Add a subtle border
  context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  context.lineWidth = 1;
  context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

/**
 * Draws the snake
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {Array} segments - Snake segments
 * @param {number} cellSize - Size of each cell in pixels
 */
export const drawSnake = (context, segments, cellSize) => {
  if (segments.length === 0) return;
  
  // Draw head
  drawCell(context, segments[0].x, segments[0].y, cellSize, COLORS.SNAKE_HEAD);
  
  // Draw body
  for (let i = 1; i < segments.length; i++) {
    drawCell(context, segments[i].x, segments[i].y, cellSize, COLORS.SNAKE_BODY);
  }
};

/**
 * Draws the food
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {Object} position - Food position
 * @param {number} cellSize - Size of each cell in pixels
 */
export const drawFood = (context, position, cellSize) => {
  if (!position) return;
  
  // Draw food as a circle
  const centerX = (position.x + 0.5) * cellSize;
  const centerY = (position.y + 0.5) * cellSize;
  const radius = cellSize / 2 * 0.8;
  
  context.fillStyle = COLORS.FOOD;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();
};

/**
 * Draws the score
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} score - Current score
 * @param {number} canvasWidth - Width of the canvas
 */
export const drawScore = (context, score, canvasWidth) => {
  context.fillStyle = COLORS.TEXT;
  context.font = '20px Arial';
  context.textAlign = 'center';
  context.fillText(`Score: ${score}`, canvasWidth / 2, 30);
};

/**
 * Draws the game over overlay
 * @param {CanvasRenderingContext2D} context - Canvas rendering context
 * @param {number} score - Final score
 * @param {number} canvasWidth - Width of the canvas
 * @param {number} canvasHeight - Height of the canvas
 */
export const drawGameOverOverlay = (context, score, canvasWidth, canvasHeight) => {
  // Draw semi-transparent overlay
  context.fillStyle = COLORS.OVERLAY;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw game over text
  context.fillStyle = 'white';
  context.font = 'bold 32px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('GAME OVER', canvasWidth / 2, canvasHeight / 2 - 30);
  
  // Draw score
  context.font = '24px Arial';
  context.fillText(`Final Score: ${score}`, canvasWidth / 2, canvasHeight / 2 + 20);
};