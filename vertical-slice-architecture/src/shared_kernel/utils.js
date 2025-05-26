// Utility functions for the Snake Game

/**
 * Generates a random integer between min (inclusive) and max (exclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random integer
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates a random position on the grid
 * @param {number} gridSize - Size of the grid
 * @param {Array} excludePositions - Array of positions to exclude
 * @returns {Object} Random position {x, y}
 */
export function getRandomPosition(gridSize, excludePositions = []) {
    let position;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop if grid is too crowded
    
    do {
        position = {
            x: getRandomInt(0, gridSize),
            y: getRandomInt(0, gridSize)
        };
        attempts++;
        
        // If we've tried too many times, find any available position
        if (attempts >= maxAttempts) {
            // Create a list of all possible positions
            const allPositions = [];
            for (let x = 0; x < gridSize; x++) {
                for (let y = 0; y < gridSize; y++) {
                    allPositions.push({ x, y });
                }
            }
            
            // Filter out excluded positions
            const availablePositions = allPositions.filter(pos =>
                !isPositionInArray(pos, excludePositions)
            );
            
            // If there are any available positions, choose one randomly
            if (availablePositions.length > 0) {
                return availablePositions[getRandomInt(0, availablePositions.length)];
            }
            
            // If no positions are available, return a default position
            return { x: 0, y: 0 };
        }
    } while (isPositionInArray(position, excludePositions));
    
    return position;
}

/**
 * Checks if a position exists in an array of positions
 * @param {Object} position - Position to check {x, y}
 * @param {Array} positionArray - Array of positions
 * @returns {boolean} True if position exists in array
 */
export function isPositionInArray(position, positionArray) {
    return positionArray.some(pos => pos.x === position.x && pos.y === position.y);
}

/**
 * Checks if two positions are opposite directions
 * @param {Object} dir1 - First direction {x, y}
 * @param {Object} dir2 - Second direction {x, y}
 * @returns {boolean} True if directions are opposite
 */
export function areOppositeDirections(dir1, dir2) {
    return dir1.x === -dir2.x && dir1.y === -dir2.y;
}

/**
 * Clears the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
}

/**
 * Updates the score display
 * @param {number} score - Current score
 */
export function updateScoreDisplay(score) {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score: ${score}`;
}