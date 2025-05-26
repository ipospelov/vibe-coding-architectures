/**
 * Game constants
 */

// Grid dimensions
export const GRID_SIZE = 20;
export const CELL_SIZE_PX = 20;

// Game speed (milliseconds per tick)
export const DEFAULT_GAME_SPEED = 150;

// Initial snake properties
export const INITIAL_SNAKE_LENGTH = 3;

// Colors
export const COLORS = {
  BACKGROUND: '#f0f0f0',
  GRID: '#e0e0e0',
  SNAKE_HEAD: '#4CAF50',
  SNAKE_BODY: '#8BC34A',
  FOOD: '#F44336',
  TEXT: '#212121',
  OVERLAY: 'rgba(0, 0, 0, 0.7)',
  MAZE_WALL: '#333333'
};

// Key codes
export const KEYS = {
  UP: ['ArrowUp', 'w', 'W'],
  DOWN: ['ArrowDown', 's', 'S'],
  LEFT: ['ArrowLeft', 'a', 'A'],
  RIGHT: ['ArrowRight', 'd', 'D']
};