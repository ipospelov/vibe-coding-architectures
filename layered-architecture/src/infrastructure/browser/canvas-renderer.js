/**
 * CanvasRenderer class responsible for rendering the game on a canvas
 */
export class CanvasRenderer {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas element to render on
   * @param {number} gridSize - Size of the game grid
   */
  constructor(canvas, gridSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gridSize = gridSize;
    this.cellSize = 0;
    this.colors = {
      background: '#f0f0f0',
      grid: '#e0e0e0',
      snake: '#4CAF50',
      snakeHead: '#388E3C',
      food: '#F44336',
      wall: '#333333'
    };
    
    // Resize the canvas to fit the container
    this.resize();
    
    // Handle window resize events
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Resize the canvas to maintain proper cell size
   */
  resize() {
    // Get the container size (parent element or window)
    const container = this.canvas.parentElement;
    const containerSize = Math.min(
      container.clientWidth,
      container.clientHeight
    );
    
    // Set canvas size
    this.canvas.width = containerSize;
    this.canvas.height = containerSize;
    
    // Calculate cell size
    this.cellSize = containerSize / this.gridSize;
  }

  /**
   * Render the game state
   * @param {GameState} gameState - Current game state
   */
  render(gameState) {
    // Clear the canvas
    this.ctx.fillStyle = this.colors.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid lines
    this.drawGrid();
    
    // Draw maze walls
    this.drawMaze(gameState.maze);
    
    // Draw food
    this.drawFood(gameState.food);
    
    // Draw snake
    this.drawSnake(gameState.snake);
  }

  /**
   * Draw the grid lines
   */
  drawGrid() {
    this.ctx.strokeStyle = this.colors.grid;
    this.ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x <= this.gridSize; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.cellSize, 0);
      this.ctx.lineTo(x * this.cellSize, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= this.gridSize; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.cellSize);
      this.ctx.lineTo(this.canvas.width, y * this.cellSize);
      this.ctx.stroke();
    }
  }

  /**
   * Draw the snake
   * @param {Snake} snake - The snake to draw
   */
  drawSnake(snake) {
    // Draw snake body
    this.ctx.fillStyle = this.colors.snake;
    for (let i = 1; i < snake.segments.length; i++) {
      const segment = snake.segments[i];
      this.drawCell(segment.x, segment.y);
    }
    
    // Draw snake head
    this.ctx.fillStyle = this.colors.snakeHead;
    const head = snake.getHead();
    this.drawCell(head.x, head.y);
  }

  /**
   * Draw the food
   * @param {Food} food - The food to draw
   */
  drawFood(food) {
    this.ctx.fillStyle = this.colors.food;
    this.drawCell(food.position.x, food.position.y, true);
  }

  /**
   * Draw a cell at the specified grid coordinates
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {boolean} isRound - Whether to draw a round cell
   */
  drawCell(x, y, isRound = false) {
    const padding = 1; // Padding to make cells slightly smaller than grid
    const cellX = x * this.cellSize + padding;
    const cellY = y * this.cellSize + padding;
    const cellWidth = this.cellSize - 2 * padding;
    const cellHeight = this.cellSize - 2 * padding;
    
    if (isRound) {
      // Draw a circle
      const radius = cellWidth / 2;
      const centerX = cellX + radius;
      const centerY = cellY + radius;
      
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Draw a rectangle
      this.ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
    }
  }
  
  /**
   * Draw the maze walls
   * @param {Maze} maze - The maze to draw
   */
  drawMaze(maze) {
    this.ctx.fillStyle = this.colors.wall;
    
    for (let y = 0; y < maze.gridSize; y++) {
      for (let x = 0; x < maze.gridSize; x++) {
        if (maze.walls[y][x]) {
          this.drawCell(x, y);
        }
      }
    }
  }

  /**
   * Draw the game over overlay
   * @param {number} score - Final score
   */
  drawGameOver(score) {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Game over text
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 32px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      'GAME OVER',
      this.canvas.width / 2,
      this.canvas.height / 2 - 30
    );
    
    // Score text
    this.ctx.font = '24px Arial';
    this.ctx.fillText(
      `Score: ${score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );
  }
}