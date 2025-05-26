import { GameController } from './presentation/web/game-controller.js';

/**
 * Initialize the game when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get the game container element
  const gameContainer = document.getElementById('game-container');
  
  // Game options
  const options = {
    gridSize: 20,
    tickInterval: 150,
    // Maze options are handled in the domain layer
  };
  
  // Create and initialize the game controller
  const gameController = new GameController(gameContainer, options);
  
  // Start the game
  gameController.start();
  
  // Log initialization
  console.log('Maze Game initialized with options:', options);
});