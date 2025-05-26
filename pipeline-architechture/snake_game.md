Project: Browser-based Snake Game (MVP)

1. Purpose & Scope
   Purpose: deliver a minimal, fully playable Snake game in a modern browser.
   Only includes the essential features needed for a functional Snake game; excludes all optional enhancements.

2. MVP Features
   • Game Initialization
   • Snake of length 3 appears centered on a 20×20 grid.
   • One food item spawns at a random empty cell.
   • Core Game Loop
   • Game updates every 150 ms by default.
   • Each tick: move snake, detect collisions, render state.
   • Controls & Direction Handling
   • Arrow keys (and/or WASD) change direction.
   • Disallow 180° reversals (e.g. left → right).
   • Collision Detection & Game Over
   • Hitting a wall or the snake's own body triggers "Game Over."
   • On game over: pause loop, show overlay with final score, disable input until restart.
   • Scoring Display
   • Current score (number of food eaten) updates in real time above or beside the canvas.
   • Restart Functionality
   • "Restart" button resets the game to its initial state without reloading the page.
   • Browser Compatibility
   • Support latest two major versions of Chrome, Firefox, Edge and Safari.

3. Functional Requirements
   • FR-1: Initialize game state with snake length = 3 at grid center and one food item.
   • FR-2: Implement a game loop that runs at a configurable interval (default 150 ms).
   • FR-3: Capture and queue keyboard events for direction changes; prevent direct reversals.
   • FR-4: On each tick:
4. Move snake head one cell in current direction.
5. Check for wall or self-collision → if so, trigger game-over flow.
6. If head lands on food: increment score, grow snake by one segment, spawn new food.
7. Render updated snake, food, and score.
   • FR-5: Display a "Game Over" overlay with final score and a clickable "Restart" button.
   • FR-6: Reset all state (snake position/length, score, food) when "Restart" is clicked.

8. Non-Functional Requirements
   • Canvas scales to fit viewport while preserving cell aspect ratio.
   • Use ES6+ modules; separate game logic from rendering.
   • All interactive elements reachable via keyboard; minimal ARIA labels on buttons.

9. Acceptance Criteria
   • Player can move the snake using keyboard; snake cannot reverse direction 180°.
   • Snake grows when eating food; score increments accordingly.
   • Colliding with wall or self immediately stops the game and displays final score.
   • "Restart" immediately resets and restarts gameplay.
   • Works smoothly in Chrome, Firefox, Edge, and Safari without console errors.