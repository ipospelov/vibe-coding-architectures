/**
 * Sink stage - Final stage in the pipeline
 * Handles game over and other final state operations
 */

export class GameSink {
    /**
     * @param {Function} onComplete - Callback function when processing is complete
     */
    constructor(onComplete) {
        this.onComplete = onComplete;
    }
    
    /**
     * Process the final game state
     * @param {GameState} gameState - Current game state
     * @returns {GameState} Final game state
     */
    process(gameState) {
        // Handle game over state
        if (gameState.gameOver) {
            this.handleGameOver(gameState);
        }
        
        // Notify that processing is complete
        if (this.onComplete) {
            this.onComplete(gameState);
        }
        
        return gameState;
    }
    
    /**
     * Handle game over state
     * @param {GameState} gameState - Current game state
     */
    handleGameOver(gameState) {
        // Log final score
        console.log(`Game Over! Final Score: ${gameState.score}`);
        
        // Additional game over handling can be added here
        // For example, saving high scores, analytics, etc.
    }
}