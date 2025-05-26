// Movement Handler
import { CELL_SIZE } from '../../../shared_kernel/constants.js';
import { clearCanvas, updateScoreDisplay } from '../../../shared_kernel/utils.js';
import { isGameOver, setGameOver } from '../../../shared_kernel/GameState.js';
import { checkCollision } from '../collision/CollisionHandler.js';
import { handleFoodCollision } from '../scoring/ScoringHandler.js';
import { showGameOver } from '../game_over/GameOverHandler.js';
import { renderGame } from './RenderHandler.js';

/**
 * Sets up the game loop
 * @param {Object} gameState - Current game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function setupGameLoop(gameState, ctx) {
    // Clear any existing interval
    if (gameState.gameLoopInterval) {
        clearInterval(gameState.gameLoopInterval);
    }
    
    // Set up the game loop interval
    gameState.gameLoopInterval = setInterval(() => {
        gameLoop(gameState, ctx);
    }, gameState.gameSpeed);
}

/**
 * Main game loop
 * @param {Object} gameState - Current game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
function gameLoop(gameState, ctx) {
    // If game is over, stop the loop
    if (isGameOver(gameState)) {
        clearInterval(gameState.gameLoopInterval);
        gameState.gameLoopInterval = null;
        showGameOver(gameState);
        return;
    }
    
    // Update snake direction
    gameState.direction = { ...gameState.nextDirection };
    
    // Move the snake
    moveSnake(gameState);
    
    // Check for collisions
    if (checkCollision(gameState)) {
        setGameOver(gameState, true);
        showGameOver(gameState);
        return;
    }
    
    // Check if snake ate food
    handleFoodCollision(gameState);
    
    // Update score display
    updateScoreDisplay(gameState.score);
    
    // Clear the canvas
    clearCanvas(ctx, ctx.canvas.width, ctx.canvas.height);
    
    // Render the game
    renderGame(gameState, ctx);
}

/**
 * Moves the snake one cell in the current direction
 * @param {Object} gameState - Current game state
 */
function moveSnake(gameState) {
    // Get the current head position
    const head = gameState.snake[0];
    
    // Calculate new head position
    const newHead = {
        x: head.x + gameState.direction.x,
        y: head.y + gameState.direction.y
    };
    
    // Add new head to the beginning of the snake
    gameState.snake.unshift(newHead);
    
    // Remove the tail unless the snake ate food
    // (food handling is done in ScoringHandler)
    if (!gameState.ateFood) {
        gameState.snake.pop();
    } else {
        // Reset the ateFood flag
        gameState.ateFood = false;
    }
}