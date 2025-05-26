/**
 * Render stage - Renders the game state to the canvas
 * This is the fourth stage in the pipeline
 */

export class GameRenderer {
    /**
     * @param {Function} onRender - Callback function after rendering
     */
    constructor(onRender) {
        this.onRender = onRender;
        this.canvas = null;
        this.ctx = null;
        this.cellSize = 0;
        
        // Colors
        this.colors = {
            background: '#ffffff',
            snake: '#4CAF50',
            snakeHead: '#388E3C',
            food: '#F44336',
            grid: '#f0f0f0'
        };
    }
    
    /**
     * Initialize the renderer
     */
    init() {
        // Get canvas and context
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get canvas context');
            return;
        }
        
        // Set initial canvas size
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    
    /**
     * Resize canvas to fit viewport while preserving aspect ratio
     */
    resizeCanvas() {
        if (!this.canvas) return;
        
        const maxSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.7);
        const size = Math.floor(maxSize / 20) * 20; // Make it divisible by grid size
        
        this.canvas.width = size;
        this.canvas.height = size;
        
        // Recalculate cell size
        this.cellSize = size / 20;
    }
    
    /**
     * Process the game state and render it
     * @param {GameState} gameState - Current game state
     * @returns {GameState} Unchanged game state
     */
    process(gameState) {
        if (!this.ctx || !this.canvas) {
            return gameState;
        }
        
        // Clear canvas
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid (optional)
        this.drawGrid(gameState.gridSize);
        
        // Draw food
        if (gameState.food) {
            this.drawFood(gameState.food);
        }
        
        // Draw snake
        this.drawSnake(gameState.snake);
        
        // Update score display
        this.updateScore(gameState.score);
        
        // Show/hide game over overlay
        this.toggleGameOverOverlay(gameState.gameOver, gameState.score);
        
        // Notify the next stage
        if (this.onRender) {
            this.onRender(gameState);
        }
        
        return gameState;
    }
    
    /**
     * Draw the grid
     * @param {number} gridSize - Size of the grid
     */
    drawGrid(gridSize) {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= gridSize; i++) {
            const pos = i * this.cellSize;
            
            // Vertical line
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();
            
            // Horizontal line
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }
    }
    
    /**
     * Draw the snake
     * @param {Array} snake - Array of snake segments
     */
    drawSnake(snake) {
        // Draw body
        this.ctx.fillStyle = this.colors.snake;
        for (let i = 1; i < snake.length; i++) {
            this.drawCell(snake[i]);
        }
        
        // Draw head (different color)
        if (snake.length > 0) {
            this.ctx.fillStyle = this.colors.snakeHead;
            this.drawCell(snake[0]);
        }
    }
    
    /**
     * Draw food
     * @param {Object} food - Food position {x, y}
     */
    drawFood(food) {
        this.ctx.fillStyle = this.colors.food;
        this.drawCell(food);
    }
    
    /**
     * Draw a single cell
     * @param {Object} position - Cell position {x, y}
     */
    drawCell(position) {
        const x = position.x * this.cellSize;
        const y = position.y * this.cellSize;
        const size = this.cellSize;
        
        // Draw with a small margin for better visibility
        const margin = 1;
        this.ctx.fillRect(x + margin, y + margin, size - margin * 2, size - margin * 2);
    }
    
    /**
     * Update score display
     * @param {number} score - Current score
     */
    updateScore(score) {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
    
    /**
     * Toggle game over overlay
     * @param {boolean} isGameOver - Whether game is over
     * @param {number} finalScore - Final score
     */
    toggleGameOverOverlay(isGameOver, finalScore) {
        const overlay = document.getElementById('game-over');
        const finalScoreElement = document.getElementById('final-score');
        
        if (overlay) {
            overlay.classList.toggle('hidden', !isGameOver);
        }
        
        if (finalScoreElement && isGameOver) {
            finalScoreElement.textContent = finalScore;
        }
    }
    
    /**
     * Clean up event listeners
     */
    cleanup() {
        window.removeEventListener('resize', this.resizeCanvas);
    }
}