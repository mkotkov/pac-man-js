function calculateNextMove(ghostPosition, pacManPosition) {
    // Calculate the horizontal and vertical distances between the ghost and Pac-Man
    const horizontalDistance = pacManPosition.x - ghostPosition.x;
    const verticalDistance = pacManPosition.y - ghostPosition.y;

    // Check for collision
    if (horizontalDistance === 0 && verticalDistance === 0) {
        // Handle collision here
        // For example, decrease life or end the game
        decreaseLife(); // Call a function to decrease life
        endGame(); // Call a function to end the game
    }

    // Determine the direction to move based on the distances
    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
        // Move horizontally towards Pac-Man
        if (horizontalDistance > 0) {
            return 'right';
        } else {
            return 'left';
        }
    } else if (Math.abs(horizontalDistance) < Math.abs(verticalDistance)) {
        // Move vertically towards Pac-Man
        if (verticalDistance > 0) {
            return 'down';
        } else {
            return 'up';
        }
    } else {
        // Randomize the direction when distances are equal
        const randomDirection = Math.random() < 0.5 ? 'left' : 'up';
        return randomDirection;
    }
}

// Example usage
const ghostPosition = { x: 2, y: 3 };
const pacManPosition = { x: 2, y: 3 }; // Simulating collision
const nextMove = calculateNextMove(ghostPosition, pacManPosition);
console.log('Next move:', nextMove);