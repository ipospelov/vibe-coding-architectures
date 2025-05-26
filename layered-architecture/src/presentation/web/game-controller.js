import { GameService } from '../../application/services/game-service.js';
import { KeyboardController } from '../../infrastructure/browser/keyboard-controller.js';
import { CanvasRenderer } from '../../infrastructure/browser/canvas-renderer.js';

/**
 * GameController class responsible for coordinating the UI and game logic
 */
export class GameController {
  /**
   * @param {HTMLElement} container - Container element for the game
   * @param {Object} options - Game options
   */
  constructor(container, options = {}) {
    // Default options
    this.options = {
      gridSize: 20,
      tickInterval: 150,
      ...options
    };
    
    // Create container elements
    this.container = container;
    this.createElements();
    
    // Initialize game service
    this.gameService = new GameService(
      this.options.gridSize,
      this.options.tickInterval
    );
    
    // Initialize renderer
    this.renderer = new CanvasRenderer(
      this.canvasElement,
      this.options.gridSize
    );
    
    // Initialize keyboard controller
    this.keyboardController = new KeyboardController(this.gameService);
    
    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Create the necessary DOM elements
   */
  createElements() {
    // Game container
    this.container.classList.add('snake-game-container');
    
    // Score display
    this.scoreElement = document.createElement('div');
    this.scoreElement.classList.add('score-display');
    this.scoreElement.textContent = 'Score: 0';
    this.container.appendChild(this.scoreElement);
    
    // Canvas container
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.classList.add('canvas-container');
    this.container.appendChild(this.canvasContainer);
    
    // Canvas element
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.classList.add('game-canvas');
    this.canvasContainer.appendChild(this.canvasElement);
    
    // Game over overlay
    this.gameOverElement = document.createElement('div');
    this.gameOverElement.classList.add('game-over-overlay');
    this.gameOverElement.style.display = 'none';
    this.canvasContainer.appendChild(this.gameOverElement);
    
    // Game over content
    this.gameOverContent = document.createElement('div');
    this.gameOverContent.classList.add('game-over-content');
    this.gameOverElement.appendChild(this.gameOverContent);
    
    // Restart button
    this.restartButton = document.createElement('button');
    this.restartButton.classList.add('restart-button');
    this.restartButton.textContent = 'Restart';
    this.restartButton.setAttribute('aria-label', 'Restart Game');
    this.gameOverContent.appendChild(this.restartButton);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Game update event
    this.gameService.on('onUpdate', (gameState) => {
      this.renderer.render(gameState);
    });
    
    // Score change event
    this.gameService.on('onScoreChange', (score) => {
      this.updateScore(score);
    });
    
    // Game over event
    this.gameService.on('onGameOver', (data) => {
      this.showGameOver(data.score, data.reason);
    });
    
    // Restart button click
    this.restartButton.addEventListener('click', () => {
      this.restart();
    });
  }

  /**
   * Start the game
   */
  start() {
    // Hide game over overlay
    this.gameOverElement.style.display = 'none';
    
    // Start keyboard controller
    this.keyboardController.start();
    
    // Start game service
    this.gameService.start();
    
    // Initial render
    this.renderer.render(this.gameService.getGameState());
  }

  /**
   * Restart the game
   */
  restart() {
    // Reset game state
    this.gameService.reset();
    
    // Hide game over overlay
    this.gameOverElement.style.display = 'none';
    
    // Update score display
    this.updateScore(0);
  }

  /**
   * Update the score display
   * @param {number} score - Current score
   */
  updateScore(score) {
    this.scoreElement.textContent = `Score: ${score}`;
  }

  /**
   * Show the game over overlay
   * @param {number} score - Final score
   * @param {string} reason - Reason for game over
   */
  showGameOver(score, reason) {
    // Update game over content
    this.gameOverContent.innerHTML = '';
    
    // Game over title
    const gameOverTitle = document.createElement('h2');
    gameOverTitle.textContent = 'Game Over';
    this.gameOverContent.appendChild(gameOverTitle);
    
    // Game over reason
    const gameOverReason = document.createElement('p');
    if (reason === 'wall') {
      gameOverReason.textContent = 'You hit the boundary wall!';
    } else if (reason === 'maze') {
      gameOverReason.textContent = 'You hit a maze wall!';
    } else if (reason === 'self') {
      gameOverReason.textContent = 'You hit yourself!';
    } else {
      gameOverReason.textContent = 'Game over!';
    }
    this.gameOverContent.appendChild(gameOverReason);
    
    // Final score
    const finalScore = document.createElement('p');
    finalScore.textContent = `Final Score: ${score}`;
    this.gameOverContent.appendChild(finalScore);
    
    // Add restart button back
    this.gameOverContent.appendChild(this.restartButton);
    
    // Show overlay
    this.gameOverElement.style.display = 'flex';
  }
}