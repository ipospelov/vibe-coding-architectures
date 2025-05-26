/**
 * UI layout management
 */

import { createRestartButton, createScoreDisplay, createGameOverOverlay } from './components.js';

/**
 * Creates the game UI layout
 * @param {HTMLElement} container - Container element for the UI
 * @param {Function} onRestart - Restart event handler
 * @returns {Object} - UI elements and update functions
 */
export const createGameUI = (container, onRestart) => {
  // Create container for the game UI
  const uiContainer = document.createElement('div');
  uiContainer.style.position = 'relative';
  uiContainer.style.width = 'fit-content';
  uiContainer.style.margin = '0 auto';
  
  // Create game container (will hold the canvas)
  const gameContainer = document.createElement('div');
  gameContainer.style.position = 'relative';
  
  // Create score display
  const scoreDisplay = createScoreDisplay(0);
  
  // Create restart button
  const restartButton = createRestartButton(onRestart);
  
  // Create game over overlay
  const gameOverOverlay = createGameOverOverlay(onRestart);
  
  // Add elements to containers
  uiContainer.appendChild(scoreDisplay.element);
  gameContainer.appendChild(gameOverOverlay.element);
  uiContainer.appendChild(gameContainer);
  uiContainer.appendChild(restartButton);
  
  // Add UI container to the main container
  container.appendChild(uiContainer);
  
  return {
    gameContainer,
    updateScore: scoreDisplay.updateScore,
    showGameOver: gameOverOverlay.show,
    hideGameOver: gameOverOverlay.hide
  };
};

/**
 * Creates a responsive container for the game
 * @returns {HTMLElement} - Container element
 */
export const createGameContainer = () => {
  const container = document.createElement('div');
  container.id = 'snake-game-container';
  
  // Style the container
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.padding = '20px';
  container.style.maxWidth = '100%';
  container.style.boxSizing = 'border-box';
  
  // Add title
  const title = document.createElement('h1');
  title.textContent = 'Snake Game';
  title.style.textAlign = 'center';
  title.style.margin = '0 0 20px 0';
  
  container.appendChild(title);
  
  return container;
};

/**
 * Adds responsive styles to the game
 * @param {HTMLElement} container - Game container element
 * @param {HTMLCanvasElement} canvas - Game canvas element
 */
export const makeGameResponsive = (container, canvas) => {
  // Function to resize the game container
  const resizeGame = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gameAspectRatio = canvas.width / canvas.height;
    
    let newWidth = canvas.width;
    let newHeight = canvas.height;
    
    // Calculate maximum size while preserving aspect ratio
    if (windowWidth < canvas.width + 40) {
      newWidth = windowWidth - 40;
      newHeight = newWidth / gameAspectRatio;
    }
    
    // Apply new size
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
  };
  
  // Initial resize
  resizeGame();
  
  // Add resize event listener
  window.addEventListener('resize', resizeGame);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resizeGame);
  };
};