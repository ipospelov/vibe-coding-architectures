/**
 * Game configuration
 */
export const config = {
    // Grid configuration
    grid: {
        size: 20,
        cellSize: 20
    },
    
    // Snake configuration
    snake: {
        initialLength: 3,
        initialDirection: 'right'
    },
    
    // Game loop configuration
    gameLoop: {
        updateInterval: 150 // milliseconds
    },
    
    // Colors
    colors: {
        background: '#ffffff',
        grid: '#f0f0f0',
        snake: '#4CAF50',
        snakeHead: '#388E3C',
        food: '#F44336'
    }
};