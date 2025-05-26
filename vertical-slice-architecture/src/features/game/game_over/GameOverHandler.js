// Game Over Handler
import { getCurrentScore } from '../scoring/ScoringHandler.js';

/**
 * Shows the game over overlay
 * @param {Object} gameState - Current game state
 */
export function showGameOver(gameState) {
    // Get the game over overlay element
    const overlay = document.getElementById('game-over-overlay');
    
    // Get the final score element
    const finalScoreElement = document.getElementById('final-score');
    
    // Set the final score text
    const score = getCurrentScore(gameState);
    finalScoreElement.textContent = `Your score: ${score}`;
    
    // Show the overlay
    overlay.style.display = 'flex';
    
    // Focus the restart button for accessibility
    const restartButton = document.getElementById('restart-button');
    restartButton.focus();
}

/**
 * Hides the game over overlay
 */
export function hideGameOver() {
    // Get the game over overlay element
    const overlay = document.getElementById('game-over-overlay');
    
    // Hide the overlay
    overlay.style.display = 'none';
}

/**
 * Checks if the game is in a game over state
 * @param {Object} gameState - Current game state
 * @returns {boolean} True if game is over
 */
export function isGameOverState(gameState) {
    return gameState.isGameOver;
}