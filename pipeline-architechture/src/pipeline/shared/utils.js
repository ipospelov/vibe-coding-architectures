/**
 * Utility functions for the Snake game
 */

/**
 * Check if two positions are equal
 * @param {Object} pos1 - First position {x, y}
 * @param {Object} pos2 - Second position {x, y}
 * @returns {boolean} True if positions are equal
 */
export function arePositionsEqual(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * Check if a position is in an array of positions
 * @param {Object} position - Position to check {x, y}
 * @param {Array} positionArray - Array of positions [{x, y}, ...]
 * @returns {boolean} True if position is in array
 */
export function isPositionInArray(position, positionArray) {
    return positionArray.some(pos => arePositionsEqual(pos, position));
}

/**
 * Check if a direction change is valid (prevents 180° reversals)
 * @param {string} currentDirection - Current direction ('up', 'down', 'left', 'right')
 * @param {string} newDirection - New direction ('up', 'down', 'left', 'right')
 * @returns {boolean} True if direction change is valid
 */
export function isValidDirectionChange(currentDirection, newDirection) {
    if (currentDirection === 'up' && newDirection === 'down') return false;
    if (currentDirection === 'down' && newDirection === 'up') return false;
    if (currentDirection === 'left' && newDirection === 'right') return false;
    if (currentDirection === 'right' && newDirection === 'left') return false;
    return true;
}

/**
 * Get the next position based on current position and direction
 * @param {Object} position - Current position {x, y}
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @returns {Object} Next position {x, y}
 */
export function getNextPosition(position, direction) {
    const nextPosition = { ...position };
    
    switch (direction) {
        case 'up':
            nextPosition.y -= 1;
            break;
        case 'down':
            nextPosition.y += 1;
            break;
        case 'left':
            nextPosition.x -= 1;
            break;
        case 'right':
            nextPosition.x += 1;
            break;
    }
    
    return nextPosition;
}

/**
 * Check if a position is within the grid boundaries
 * @param {Object} position - Position to check {x, y}
 * @param {number} gridSize - Size of the grid
 * @returns {boolean} True if position is within boundaries
 */
export function isWithinBoundaries(position, gridSize) {
    return position.x >= 0 && position.x < gridSize && 
           position.y >= 0 && position.y < gridSize;
}

/**
 * Create a simple event emitter
 * @returns {Object} Event emitter with on, off, and emit methods
 */
export function createEventEmitter() {
    const events = {};
    
    return {
        /**
         * Subscribe to an event
         * @param {string} event - Event name
         * @param {Function} callback - Callback function
         */
        on(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        },
        
        /**
         * Unsubscribe from an event
         * @param {string} event - Event name
         * @param {Function} callback - Callback function
         */
        off(event, callback) {
            if (!events[event]) return;
            events[event] = events[event].filter(cb => cb !== callback);
        },
        
        /**
         * Emit an event
         * @param {string} event - Event name
         * @param {*} data - Data to pass to callbacks
         */
        emit(event, data) {
            if (!events[event]) return;
            events[event].forEach(callback => callback(data));
        }
    };
}