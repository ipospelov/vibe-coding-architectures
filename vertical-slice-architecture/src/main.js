// Main entry point for the Snake Game
import { initializeGame } from './features/game/initialize/InitializeGameHandler.js';
import { setupInputHandling } from './features/game/input/InputHandler.js';
import { setupGameLoop } from './features/game/movement/MovementHandler.js';
import { setupRestartButton } from './features/game/restart/RestartHandler.js';
import { GRID_SIZE, CELL_SIZE } from './shared_kernel/constants.js';

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas and its context
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ensure canvas dimensions match our grid size
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    
    // Initialize the game state
    const gameState = initializeGame();
    
    // Setup input handling
    setupInputHandling(gameState);
    
    // Setup the game loop
    setupGameLoop(gameState, ctx);
    
    // Setup restart functionality
    setupRestartButton(gameState, ctx);
    
    console.log('Snake Game initialized successfully!');
});