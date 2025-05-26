// Input Handler
import { DIRECTION, KEY_CODES } from '../../../shared_kernel/constants.js';
import { areOppositeDirections } from '../../../shared_kernel/utils.js';
import { isGameOver } from '../../../shared_kernel/GameState.js';

/**
 * Sets up keyboard input handling
 * @param {Object} gameState - Current game state
 */
export function setupInputHandling(gameState) {
    // Add event listener for keydown events
    document.addEventListener('keydown', (event) => {
        handleKeyPress(event, gameState);
    });
}

/**
 * Handles key press events
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} gameState - Current game state
 */
function handleKeyPress(event, gameState) {
    // If game is over, don't process input
    if (isGameOver(gameState)) {
        return;
    }
    
    // Get the key code
    const key = event.code;
    
    // Determine the new direction based on the key pressed
    let newDirection = null;
    
    switch (key) {
        case KEY_CODES.ARROW_UP:
        case KEY_CODES.W:
            newDirection = DIRECTION.UP;
            break;
        case KEY_CODES.ARROW_DOWN:
        case KEY_CODES.S:
            newDirection = DIRECTION.DOWN;
            break;
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.A:
            newDirection = DIRECTION.LEFT;
            break;
        case KEY_CODES.ARROW_RIGHT:
        case KEY_CODES.D:
            newDirection = DIRECTION.RIGHT;
            break;
        default:
            // Ignore other keys
            return;
    }
    
    // Prevent 180° reversals
    if (!areOppositeDirections(newDirection, gameState.direction)) {
        gameState.nextDirection = newDirection;
    }
    
    // Prevent default behavior for arrow keys to avoid scrolling
    if (Object.values(KEY_CODES).includes(key)) {
        event.preventDefault();
    }
}