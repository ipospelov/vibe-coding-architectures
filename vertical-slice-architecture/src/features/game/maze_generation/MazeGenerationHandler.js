// Maze Generation Handler
import { GRID_SIZE } from '../../../shared_kernel/constants.js';

/**
 * Generates a maze for the game
 * @param {Object} gameState - Current game state
 */
export function generateMaze(gameState) {
    // Initialize walls array if it doesn't exist
    if (!gameState.walls) {
        gameState.walls = [];
    } else {
        // Clear existing walls
        gameState.walls.length = 0;
    }
    
    // Generate maze using recursive division algorithm
    const width = gameState.gridSize;
    const height = gameState.gridSize;
    
    // Add border walls (optional - can be removed if you want the snake to wrap around)
    // addBorderWalls(gameState, width, height);
    
    // Generate internal maze walls
    recursiveDivision(gameState, 1, 1, width - 2, height - 2);
    
    // Ensure the snake's initial position and path are clear
    clearSnakePath(gameState);
    
    // Ensure food is not placed on a wall
    ensureFoodNotOnWall(gameState);
}

/**
 * Add border walls around the grid
 * @param {Object} gameState - Current game state
 * @param {number} width - Grid width
 * @param {number} height - Grid height
 */
function addBorderWalls(gameState, width, height) {
    // Top and bottom walls
    for (let x = 0; x < width; x++) {
        gameState.walls.push({ x, y: 0 });
        gameState.walls.push({ x, y: height - 1 });
    }
    
    // Left and right walls
    for (let y = 1; y < height - 1; y++) {
        gameState.walls.push({ x: 0, y });
        gameState.walls.push({ x: width - 1, y });
    }
}

/**
 * Recursive division maze generation algorithm
 * @param {Object} gameState - Current game state
 * @param {number} x - Starting x coordinate
 * @param {number} y - Starting y coordinate
 * @param {number} width - Chamber width
 * @param {number} height - Chamber height
 * @param {number} depth - Current recursion depth
 */
function recursiveDivision(gameState, x, y, width, height, depth = 0) {
    // Base case: if the chamber is too small, stop recursion
    if (width < 3 || height < 3 || depth > 5) {
        return;
    }
    
    // Decide whether to divide horizontally or vertically
    const divideHorizontally = width < height ? true : (height < width ? false : Math.random() < 0.5);
    
    if (divideHorizontally) {
        // Divide horizontally
        const wallY = Math.floor(Math.random() * (height - 2)) + y + 1;
        const passageX = Math.floor(Math.random() * width) + x;
        
        // Add horizontal wall with a passage
        for (let i = 0; i < width; i++) {
            const wallX = x + i;
            if (wallX !== passageX) {
                gameState.walls.push({ x: wallX, y: wallY });
            }
        }
        
        // Recursively divide the top and bottom chambers
        recursiveDivision(gameState, x, y, width, wallY - y, depth + 1);
        recursiveDivision(gameState, x, wallY + 1, width, height - (wallY - y + 1), depth + 1);
    } else {
        // Divide vertically
        const wallX = Math.floor(Math.random() * (width - 2)) + x + 1;
        const passageY = Math.floor(Math.random() * height) + y;
        
        // Add vertical wall with a passage
        for (let i = 0; i < height; i++) {
            const wallY = y + i;
            if (wallY !== passageY) {
                gameState.walls.push({ x: wallX, y: wallY });
            }
        }
        
        // Recursively divide the left and right chambers
        recursiveDivision(gameState, x, y, wallX - x, height, depth + 1);
        recursiveDivision(gameState, wallX + 1, y, width - (wallX - x + 1), height, depth + 1);
    }
}

/**
 * Clear walls around the snake's initial position and path
 * @param {Object} gameState - Current game state
 */
function clearSnakePath(gameState) {
    // Get the snake's initial position
    const snake = gameState.snake;
    
    // Create a safe zone around the snake
    const safeZone = [];
    
    // Add snake positions and surrounding cells to safe zone
    snake.forEach(segment => {
        // Add the segment itself
        safeZone.push({ x: segment.x, y: segment.y });
        
        // Add surrounding cells (optional)
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                safeZone.push({ 
                    x: segment.x + dx, 
                    y: segment.y + dy 
                });
            }
        }
    });
    
    // Add a path in front of the snake (in the direction it's moving)
    const head = snake[0];
    const direction = gameState.direction;
    
    // Add a few cells in front of the snake to ensure it has a clear path
    for (let i = 1; i <= 3; i++) {
        safeZone.push({
            x: head.x + direction.x * i,
            y: head.y + direction.y * i
        });
    }
    
    // Remove walls that overlap with the safe zone
    gameState.walls = gameState.walls.filter(wall => 
        !safeZone.some(safe => safe.x === wall.x && safe.y === wall.y)
    );
}

/**
 * Ensure food is not placed on a wall
 * @param {Object} gameState - Current game state
 */
function ensureFoodNotOnWall(gameState) {
    // Check if food is on a wall
    const isOnWall = gameState.walls.some(wall => 
        wall.x === gameState.food.x && wall.y === gameState.food.y
    );
    
    // If food is on a wall, move it to a valid position
    if (isOnWall) {
        // Get all valid positions (not on walls or snake)
        const validPositions = [];
        
        for (let x = 0; x < gameState.gridSize; x++) {
            for (let y = 0; y < gameState.gridSize; y++) {
                const position = { x, y };
                
                // Check if position is not on a wall or snake
                const isOnWall = gameState.walls.some(wall => 
                    wall.x === position.x && wall.y === position.y
                );
                
                const isOnSnake = gameState.snake.some(segment => 
                    segment.x === position.x && segment.y === position.y
                );
                
                if (!isOnWall && !isOnSnake) {
                    validPositions.push(position);
                }
            }
        }
        
        // Choose a random valid position for the food
        if (validPositions.length > 0) {
            const randomIndex = Math.floor(Math.random() * validPositions.length);
            gameState.food = validPositions[randomIndex];
        }
    }
}