/**
 * Maze class representing the walls in the game
 */
export class Maze {
  /**
   * @param {number} gridSize - Size of the game grid
   * @param {boolean[][]} walls - 2D array representing wall positions
   */
  constructor(gridSize, walls) {
    this.gridSize = gridSize;
    this.walls = walls;
  }

  /**
   * Check if a position contains a wall
   * @param {Position} position - Position to check
   * @returns {boolean} True if the position contains a wall
   */
  hasWallAt(position) {
    return this.walls[position.y][position.x];
  }

  /**
   * Generate a random maze using a simplified version of Prim's algorithm
   * @param {number} gridSize - Size of the game grid
   * @param {number} wallDensity - Density of walls (0-1)
   * @returns {Maze} A new Maze instance
   */
  static generateRandom(gridSize, wallDensity = 0.2) {
    // Initialize all cells as empty
    const walls = Array(gridSize).fill().map(() => Array(gridSize).fill(false));
    
    // Add random walls based on density
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Skip the center area to ensure the snake has room to start
        const centerBuffer = Math.floor(gridSize / 5);
        const isCenterArea = 
          x >= Math.floor(gridSize / 2) - centerBuffer && 
          x <= Math.floor(gridSize / 2) + centerBuffer &&
          y >= Math.floor(gridSize / 2) - centerBuffer && 
          y <= Math.floor(gridSize / 2) + centerBuffer;
        
        // Skip border cells to avoid trapping the player
        const isBorder = x === 0 || y === 0 || x === gridSize - 1 || y === gridSize - 1;
        
        if (!isCenterArea && !isBorder && Math.random() < wallDensity) {
          walls[y][x] = true;
        }
      }
    }
    
    // Ensure there are no isolated areas by creating some paths
    for (let i = 0; i < gridSize * 2; i++) {
      const x = Math.floor(Math.random() * (gridSize - 2)) + 1;
      const y = Math.floor(Math.random() * (gridSize - 2)) + 1;
      walls[y][x] = false;
    }
    
    return new Maze(gridSize, walls);
  }
}