// Initialize Game Handler
import { createGameState } from '../../../shared_kernel/GameState.js';
import { DIRECTION, GRID_SIZE, INITIAL_SNAKE_LENGTH, DEFAULT_GAME_SPEED } from '../../../shared_kernel/constants.js';
import { getRandomPosition } from '../../../shared_kernel/utils.js';
import { generateMaze } from '../maze_generation/MazeGenerationHandler.js';

/**
 * Initializes the game state
 * @returns {Object} Initialized game state
 */
export function initializeGame() {
    // Create a new game state
    const gameState = createGameState();
    
    // Initialize snake at the center of the grid
    initializeSnake(gameState);
    
    // Generate maze walls
    generateMaze(gameState);
    
    // Initialize food at a random position
    initializeFood(gameState);
    
    // Set game speed
    gameState.gameSpeed = DEFAULT_GAME_SPEED;
    
    return gameState;
}

/**
 * Initializes the snake at the center of the grid
 * @param {Object} state - Game state
 */
function initializeSnake(state) {
    const centerX = Math.floor(state.gridSize / 2);
    const centerY = Math.floor(state.gridSize / 2);
    
    // Create snake with initial length
    state.snake = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        // Snake starts horizontally, with head at the center
        // and body extending to the left
        state.snake.push({
            x: centerX - i,
            y: centerY
        });
    }
    
    // Set initial direction to right
    state.direction = { ...DIRECTION.RIGHT };
    state.nextDirection = { ...DIRECTION.RIGHT };
}

/**
 * Initializes food at a random position
 * @param {Object} state - Game state
 */
function initializeFood(state) {
    // Generate random position for food that doesn't overlap with snake or walls
    const excludePositions = [...state.snake, ...state.walls];
    state.food = getRandomPosition(state.gridSize, excludePositions);
}