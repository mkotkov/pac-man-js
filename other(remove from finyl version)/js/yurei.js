function calculateNextMove(ghostPos, pacManPos) {
    if (!isValidPosition(ghostPos) || !isValidPosition(pacManPos)) {
        return getRandomDirection(); // If either ghost or Pac-Man position is invalid, choose a random direction
    }

    const horizontalDist = pacManPos.x - ghostPos.x; // Calculate horizontal distance between ghost and Pac-Man
    const verticalDist = pacManPos.y - ghostPos.y; // Calculate vertical distance between ghost and Pac-Man

    if (horizontalDist === 0 && verticalDist === 0) {
        handleCollision(); // If ghost and Pac-Man are at the same position, handle collision
    }

    if (Math.abs(horizontalDist) > Math.abs(verticalDist)) {
        return horizontalDist > 0 ? 'right' : 'left'; // If horizontal distance is greater, move right if positive, left if negative
    } else {
        return verticalDist > 0 ? 'down' : 'up'; // If vertical distance is greater or equal, move down if positive, up if negative
    }
}

function handleCollision() {
    decreaseLife(); // Decrease life when collision occurs
    endGame(); // End the game
}

function getRandomDirection() {
    return Math.random() < 0.5 ? 'left' : 'up'; // Return a random direction (left or up)
}

function isValidPosition(position) {
    return position && Number.isInteger(position.x) && Number.isInteger(position.y); // Check if position is valid
}

const ghostPos = { x: 2, y: 3 }; // Ghost position
const pacManPos = { x: 2, y: 3 }; // Pac-Man position
const nextMove = calculateNextMove(ghostPos, pacManPos); // Calculate the next move for the ghost
console.log('Next move:', nextMove); // Output the next move to the console

