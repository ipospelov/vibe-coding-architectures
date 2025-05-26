# Snake Game

A browser-based Snake game implemented using Pipeline Architecture.

## Architecture

This project follows the Pipeline Architecture pattern, where data flows through a series of stages, with each stage performing a specific transformation.

### Pipeline Stages

1. **Source (00_source.js)** - Captures user input (keyboard events)
2. **Validate (10_validate.js)** - Validates input (prevents 180° reversals)
3. **Update (20_update.js)** - Updates game state (moves snake, handles collisions)
4. **Render (30_render.js)** - Renders the game state to the canvas
5. **Sink (40_sink.js)** - Handles game over and restart

### Directory Structure

```
src/
├── pipeline/
│   ├── stages/
│   │   ├── 00_source.js
│   │   ├── 10_validate.js
│   │   ├── 20_update.js
│   │   ├── 30_render.js
│   │   ├── 40_sink.js
│   │   └── tests/
│   ├── runner.js
│   ├── contracts/
│   │   └── GameState.js
│   ├── shared/
│   │   └── utils.js
│   └── config.js
├── index.html
├── styles.css
└── README.md
```

## Game Features

- Snake of length 3 appears centered on a 20×20 grid
- One food item spawns at a random empty cell
- Game updates every 150 ms by default
- Arrow keys (and WASD) change direction
- 180° reversals are prevented
- Hitting a wall or the snake's own body triggers "Game Over"
- Score display shows the number of food items eaten
- Restart button resets the game without reloading the page

## How to Run

Simply open the `index.html` file in a modern web browser.

## Browser Compatibility

Supports the latest two major versions of Chrome, Firefox, Edge, and Safari.