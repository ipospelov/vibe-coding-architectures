// Render Handler
import { CELL_SIZE, COLORS } from '../../../shared_kernel/constants.js';

/**
 * Renders the current game state on the canvas
 * @param {Object} gameState - Current game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function renderGame(gameState, ctx) {
    // Draw grid
    drawGrid(ctx, gameState.gridSize);
    
    // Draw maze walls
    drawWalls(ctx, gameState.walls);
    
    // Draw food
    drawFood(ctx, gameState.food);
    
    // Draw snake
    drawSnake(ctx, gameState.snake);
}

/**
 * Draws the grid on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} gridSize - Size of the grid
 */
function drawGrid(ctx, gridSize) {
    ctx.strokeStyle = COLORS.GRID;
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, gridSize * CELL_SIZE);
        ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(gridSize * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }
}

/**
 * Draws the food on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} food - Food position {x, y}
 */
function drawFood(ctx, food) {
    ctx.fillStyle = COLORS.FOOD;
    
    // Draw a circle for the food
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 * 0.8, // Slightly smaller than cell
        0,
        Math.PI * 2
    );
    ctx.fill();
}

/**
 * Draws the snake on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} snake - Array of snake segments {x, y}
 */
function drawSnake(ctx, snake) {
    // Draw each segment of the snake
    snake.forEach((segment, index) => {
        // Head is a different color
        ctx.fillStyle = index === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY;
        
        // Draw a rounded rectangle for each segment
        drawRoundedRect(
            ctx,
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2,
            4 // Corner radius
        );
    });
}

/**
 * Draws a rounded rectangle
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {number} radius - Corner radius
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

/**
 * Draws the maze walls on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} walls - Array of wall positions {x, y}
 */
function drawWalls(ctx, walls) {
    ctx.fillStyle = COLORS.WALL;
    
    // Draw each wall segment
    walls.forEach(wall => {
        ctx.fillRect(
            wall.x * CELL_SIZE,
            wall.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    });
}