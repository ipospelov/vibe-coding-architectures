/**
 * Keyboard input handling
 */

import { KEYS } from '../../atoms/constants.js';
import { getDirectionFromKey } from '../../atoms/directions.js';

/**
 * Sets up keyboard event listeners
 * @param {Function} onDirectionChange - Callback for direction changes
 * @returns {Function} - Cleanup function to remove event listeners
 */
export const setupKeyboardControls = (onDirectionChange) => {
  // Direction input queue to handle rapid key presses
  const inputQueue = [];
  
  /**
   * Processes the input queue and calls the direction change callback
   */
  const processInputQueue = () => {
    if (inputQueue.length > 0) {
      const direction = inputQueue.shift();
      onDirectionChange(direction);
    }
  };
  
  /**
   * Handles keydown events
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = (event) => {
    const direction = getDirectionFromKey(event.key, KEYS);
    
    if (direction) {
      // Prevent default behavior for arrow keys to avoid page scrolling
      event.preventDefault();
      
      // Add direction to queue if it's not already the last item
      const lastDirection = inputQueue[inputQueue.length - 1];
      if (!lastDirection || 
          direction.x !== lastDirection.x || 
          direction.y !== lastDirection.y) {
        inputQueue.push(direction);
      }
    }
  };
  
  // Add event listener
  window.addEventListener('keydown', handleKeyDown);
  
  // Return an object with the cleanup function and input processor
  return {
    cleanup: () => {
      window.removeEventListener('keydown', handleKeyDown);
    },
    processInput: processInputQueue
  };
};