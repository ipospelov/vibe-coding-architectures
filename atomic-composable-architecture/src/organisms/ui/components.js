/**
 * UI components
 */

/**
 * Creates a button element
 * @param {string} text - Button text
 * @param {Function} onClick - Click event handler
 * @param {Object} styles - Additional styles
 * @returns {HTMLButtonElement} - Button element
 */
export const createButton = (text, onClick, styles = {}) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  
  // Default styles
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.margin = '10px';
  
  // Add ARIA attributes for accessibility
  button.setAttribute('role', 'button');
  button.setAttribute('aria-label', text);
  
  // Apply additional styles
  Object.assign(button.style, styles);
  
  return button;
};

/**
 * Creates a restart button
 * @param {Function} onRestart - Restart event handler
 * @returns {HTMLButtonElement} - Restart button element
 */
export const createRestartButton = (onRestart) => {
  return createButton('Restart Game', onRestart, {
    display: 'block',
    margin: '10px auto'
  });
};

/**
 * Creates a score display element
 * @param {number} initialScore - Initial score
 * @returns {Object} - Score display element and update function
 */
export const createScoreDisplay = (initialScore = 0) => {
  const container = document.createElement('div');
  container.style.textAlign = 'center';
  container.style.margin = '10px 0';
  container.style.fontSize = '20px';
  
  const scoreElement = document.createElement('span');
  scoreElement.textContent = initialScore;
  
  container.innerHTML = 'Score: ';
  container.appendChild(scoreElement);
  
  // Function to update the score
  const updateScore = (newScore) => {
    scoreElement.textContent = newScore;
  };
  
  return {
    element: container,
    updateScore
  };
};

/**
 * Creates a game over overlay
 * @param {Function} onRestart - Restart event handler
 * @returns {Object} - Overlay element and show/hide functions
 */
export const createGameOverOverlay = (onRestart) => {
  const overlay = document.createElement('div');
  
  // Style the overlay
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.color = 'white';
  overlay.style.zIndex = '10';
  overlay.style.display = 'none'; // Hidden by default
  
  // Create game over text
  const gameOverText = document.createElement('h2');
  gameOverText.textContent = 'GAME OVER';
  gameOverText.style.fontSize = '32px';
  gameOverText.style.margin = '10px 0';
  
  // Create score display
  const scoreDisplay = document.createElement('p');
  scoreDisplay.textContent = 'Final Score: 0';
  scoreDisplay.style.fontSize = '24px';
  scoreDisplay.style.margin = '10px 0';
  
  // Create restart button
  const restartButton = createRestartButton(onRestart);
  
  // Add elements to overlay
  overlay.appendChild(gameOverText);
  overlay.appendChild(scoreDisplay);
  overlay.appendChild(restartButton);
  
  // Function to show the overlay with the final score
  const show = (finalScore) => {
    scoreDisplay.textContent = `Final Score: ${finalScore}`;
    overlay.style.display = 'flex';
  };
  
  // Function to hide the overlay
  const hide = () => {
    overlay.style.display = 'none';
  };
  
  return {
    element: overlay,
    show,
    hide
  };
};