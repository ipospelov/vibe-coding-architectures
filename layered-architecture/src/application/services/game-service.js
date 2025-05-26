import { GameState } from '../../domain/models/game-state.js';
import { Direction } from '../../domain/models/direction.js';

/**
 * GameService class responsible for managing the game logic
 */
export class GameService {
  /**
   * @param {number} gridSize - Size of the game grid
   * @param {number} tickInterval - Interval between game updates in milliseconds
   */
  constructor(gridSize = 20, tickInterval = 150) {
    this.gameState = GameState.createNew(gridSize);
    this.tickInterval = tickInterval;
    this.timerId = null;
    this.listeners = {
      onUpdate: [],
      onGameOver: [],
      onScoreChange: []
    };
    this.inputQueue = [];
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.timerId === null) {
      this.timerId = setInterval(() => this.tick(), this.tickInterval);
    }
  }

  /**
   * Pause the game loop
   */
  pause() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Reset the game to its initial state
   */
  reset() {
    this.pause();
    this.gameState.reset();
    this.inputQueue = [];
    this.notifyListeners('onUpdate', this.gameState);
    this.start();
  }

  /**
   * Process one game tick
   */
  tick() {
    // Process any queued direction changes
    this.processInputQueue();
    
    // Update game state
    const result = this.gameState.update();
    
    // Notify listeners
    this.notifyListeners('onUpdate', this.gameState);
    
    if (result.foodEaten) {
      this.notifyListeners('onScoreChange', this.gameState.score);
    }
    
    if (result.gameOver) {
      this.pause();
      this.notifyListeners('onGameOver', {
        score: this.gameState.score,
        reason: result.reason
      });
    }
  }

  /**
   * Queue a direction change
   * @param {string} direction - New direction
   */
  queueDirectionChange(direction) {
    if (Object.values(Direction).includes(direction)) {
      this.inputQueue.push(direction);
    }
  }

  /**
   * Process queued direction changes
   */
  processInputQueue() {
    if (this.inputQueue.length > 0) {
      const direction = this.inputQueue.shift();
      this.gameState.snake.setDirection(direction);
    }
  }

  /**
   * Register a listener for game events
   * @param {string} event - Event name ('onUpdate', 'onGameOver', 'onScoreChange')
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  /**
   * Notify all listeners of an event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  notifyListeners(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  /**
   * Get the current game state
   * @returns {GameState} Current game state
   */
  getGameState() {
    return this.gameState;
  }
}