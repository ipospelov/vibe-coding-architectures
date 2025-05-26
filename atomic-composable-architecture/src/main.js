/**
 * Snake Game - Main Entry Point
 * 
 * This file initializes the game and connects all the components.
 */

import { GRID_SIZE, CELL_SIZE_PX, DEFAULT_GAME_SPEED } from './atoms/constants.js';
import { createGameController } from './organisms/game/loop.js';
import { createGameContainer, createGameUI, makeGameResponsive } from './organisms/ui/layout.js';

/**
 * Initializes the Snake game
 */
function initGame() {
  // Create game container and add it to the document
  const gameContainer = createGameContainer();
  document.body.appendChild(gameContainer);
  
  // Create game UI
  let gameController;
  
  const handleRestart = () => {
    if (gameController) {
      gameController.reset();
      ui.hideGameOver();
    }
  };
  
  const ui = createGameUI(gameContainer, handleRestart);
  
  // Create game controller
  gameController = createGameController(
    ui.gameContainer,
    GRID_SIZE,
    CELL_SIZE_PX,
    DEFAULT_GAME_SPEED
  );
  
  // Make the game responsive
  const cleanupResponsive = makeGameResponsive(gameContainer, gameController.canvas);
  
  // Set up score update callback
  const originalUpdate = gameController.gameState.update;
  gameController.gameState.update = function(...args) {
    const prevScore = this.score;
    const result = originalUpdate.apply(this, args);
    
    // Update UI if score changed
    if (this.score !== prevScore) {
      ui.updateScore(this.score);
    }
    
    // Show game over screen if game is over
    if (this.isGameOver) {
      ui.showGameOver(this.score);
    }
    
    return result;
  };
  
  // Start the game
  gameController.start();
  
  // Return cleanup function
  return () => {
    gameController.cleanup();
    cleanupResponsive();
    if (gameContainer.parentNode) {
      gameContainer.parentNode.removeChild(gameContainer);
    }
  };
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);