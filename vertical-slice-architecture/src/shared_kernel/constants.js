// Game constants

// Grid configuration
export const GRID_SIZE = 20; // 20x20 grid as per requirements
export const CELL_SIZE = 20; // Size of each cell in pixels

// Game speed
export const DEFAULT_GAME_SPEED = 150; // Default update interval in milliseconds

// Directions
export const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Key codes
export const KEY_CODES = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    W: 'KeyW',
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD'
};

// Colors
export const COLORS = {
    SNAKE_HEAD: '#4CAF50',
    SNAKE_BODY: '#8BC34A',
    FOOD: '#FF5722',
    GRID: '#EEEEEE',
    BACKGROUND: '#FFFFFF',
    WALL: '#333333'  // Dark color for maze walls
};

// Initial snake length
export const INITIAL_SNAKE_LENGTH = 3;