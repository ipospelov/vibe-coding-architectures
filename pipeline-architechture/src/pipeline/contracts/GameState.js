/**
 * GameState contract - defines the structure of the game state
 * This is passed between pipeline stages
 */
export class GameState {
    /**
     * @param {Object} config - Configuration object
     * @param {number} config.gridSize - Size of the game grid (default: 20)
     * @param {number} config.initialSnakeLength - Initial length of the snake (default: 3)
     * @param {number} config.updateInterval - Game update interval in ms (default: 150)
     */
    constructor(config = {}) {
        // Game configuration
        this.gridSize = config.gridSize || 20;
        this.updateInterval = config.updateInterval || 150;
        
        // Game state
        this.snake = [];
        this.food = null;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.gameOver = false;
        
        // Initialize snake in the center of the grid
        const center = Math.floor(this.gridSize / 2);
        const initialLength = config.initialSnakeLength || 3;
        
        for (let i = 0; i < initialLength; i++) {
            this.snake.unshift({ x: center - i, y: center });
        }
        
        // Initialize food
        this.generateFood();
    }
    
    /**
     * Generate food at a random empty cell
     */
    generateFood() {
        const emptyCells = [];
        
        // Find all empty cells
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const isEmpty = !this.snake.some(segment => segment.x === x && segment.y === y);
                if (isEmpty) {
                    emptyCells.push({ x, y });
                }
            }
        }
        
        // Randomly select an empty cell
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            this.food = emptyCells[randomIndex];
        }
    }
    
    /**
     * Create a deep copy of the game state
     * @returns {GameState} A new instance with the same state
     */
    clone() {
        const newState = new GameState({
            gridSize: this.gridSize,
            updateInterval: this.updateInterval
        });
        
        newState.snake = JSON.parse(JSON.stringify(this.snake));
        newState.food = this.food ? { ...this.food } : null;
        newState.direction = this.direction;
        newState.nextDirection = this.nextDirection;
        newState.score = this.score;
        newState.gameOver = this.gameOver;
        
        return newState;
    }
}