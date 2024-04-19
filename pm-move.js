// Function to handle Pac-Man movement
function movePacMan(direction) {
    // Get the current position of Pac-Man
    const currentCell = map.getCell(pacMan.x, pacMan.y);

    // Calculate the next position based on the direction
    let nextX = pacMan.x;
    let nextY = pacMan.y;

    switch (direction) {
        case 'up':
            nextY--;
            break;
        case 'down':
            nextY++;
            break;
        case 'left':
            nextX--;
            break;
        case 'right':
            nextX++;
            break;
        default:
            break;
    }

    // Check if the next cell is a valid move
    const nextCell = map.getCell(nextX, nextY);
    if (nextCell === 'empty' || nextCell === 'dot') {
        // Update Pac-Man's position
        pacMan.x = nextX;
        pacMan.y = nextY;

        // Handle dot collection logic here if needed

        // Update the UI to reflect the new position
        updatePacManUI();
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePacMan('up');
            break;
        case 'ArrowDown':
            movePacMan('down');
            break;
        case 'ArrowLeft':
            movePacMan('left');
            break;
        case 'ArrowRight':
            movePacMan('right');
            break;
        default:
            break;
    }
});
