// Restart Handler
import { resetGameState } from '../../../shared_kernel/GameState.js';
import { initializeGame } from '../initialize/InitializeGameHandler.js';
import { setupGameLoop } from '../movement/MovementHandler.js';
import { hideGameOver } from '../game_over/GameOverHandler.js';
import { updateScoreDisplay } from '../../../shared_kernel/utils.js';

/**
 * Sets up the restart button functionality
 * @param {Object} gameState - Current game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function setupRestartButton(gameState, ctx) {
    // Get the restart button element
    const restartButton = document.getElementById('restart-button');
    
    // Add click event listener
    restartButton.addEventListener('click', () => {
        restartGame(gameState, ctx);
    });
    
    // Add keyboard event listener for Enter key when button is focused
    restartButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            restartGame(gameState, ctx);
        }
    });
}

/**
 * Restarts the game
 * @param {Object} gameState - Current game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
function restartGame(gameState, ctx) {
    // Reset the game state
    resetGameState(gameState);
    
    // Re-initialize the game
    Object.assign(gameState, initializeGame());
    
    // Hide the game over overlay
    hideGameOver();
    
    // Reset the score display
    updateScoreDisplay(gameState.score);
    
    // Setup the game loop again
    setupGameLoop(gameState, ctx);
}