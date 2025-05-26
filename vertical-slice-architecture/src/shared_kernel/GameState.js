// Game State Model
import { DIRECTION, GRID_SIZE, INITIAL_SNAKE_LENGTH } from './constants.js';
import { getRandomPosition } from './utils.js';

/**
 * Creates a new game state object
 * @returns {Object} Game state object
 */
export function createGameState() {
    return {
        // Snake properties
        snake: [],
        direction: { ...DIRECTION.RIGHT }, // Start moving right
        nextDirection: { ...DIRECTION.RIGHT }, // Next direction to move
        
        // Food properties
        food: { x: 0, y: 0 },
        
        // Maze properties
        walls: [], // Array to store wall positions
        
        // Game state
        score: 0,
        isGameOver: false,
        isPaused: false,
        
        // Game loop
        gameLoopInterval: null,
        gameSpeed: 0,
        
        // Grid properties
        gridSize: GRID_SIZE
    };
}

/**
 * Resets the game state to initial values
 * @param {Object} state - Current game state
 * @returns {Object} Reset game state
 */
export function resetGameState(state) {
    // Clear any existing game loop
    if (state.gameLoopInterval) {
        clearInterval(state.gameLoopInterval);
    }
    
    // Create a new state
    const newState = createGameState();
    
    // Copy over properties that should persist
    Object.assign(state, newState);
    
    return state;
}

/**
 * Checks if the game is over
 * @param {Object} state - Current game state
 * @returns {boolean} True if game is over
 */
export function isGameOver(state) {
    return state.isGameOver;
}

/**
 * Sets the game over state
 * @param {Object} state - Current game state
 * @param {boolean} isOver - Whether the game is over
 */
export function setGameOver(state, isOver) {
    state.isGameOver = isOver;
}

/**
 * Gets the current score
 * @param {Object} state - Current game state
 * @returns {number} Current score
 */
export function getScore(state) {
    return state.score;
}

/**
 * Increments the score
 * @param {Object} state - Current game state
 */
export function incrementScore(state) {
    state.score += 1;
}