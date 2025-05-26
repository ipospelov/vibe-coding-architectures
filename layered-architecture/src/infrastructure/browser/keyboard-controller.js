import { Direction } from '../../domain/models/direction.js';

/**
 * KeyboardController class responsible for handling keyboard input
 */
export class KeyboardController {
  /**
   * @param {GameService} gameService - The game service to control
   */
  constructor(gameService) {
    this.gameService = gameService;
    this.keyMap = {
      // Arrow keys
      'ArrowUp': Direction.UP,
      'ArrowDown': Direction.DOWN,
      'ArrowLeft': Direction.LEFT,
      'ArrowRight': Direction.RIGHT,
      
      // WASD keys
      'KeyW': Direction.UP,
      'KeyS': Direction.DOWN,
      'KeyA': Direction.LEFT,
      'KeyD': Direction.RIGHT
    };
    
    // Bind event handler to this instance
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Start listening for keyboard events
   */
  start() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Stop listening for keyboard events
   */
  stop() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handle keydown events
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyDown(event) {
    // Check if the key is mapped
    const direction = this.keyMap[event.code];
    
    if (direction) {
      // Prevent default behavior (e.g., scrolling)
      event.preventDefault();
      
      // Queue the direction change
      this.gameService.queueDirectionChange(direction);
    }
  }
}