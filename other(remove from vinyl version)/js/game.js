import { config } from './config.js';
import { LevelRenderer } from './level.js';
import { Pacman } from './pacman.js';

export class Game {
    constructor() {
        this.screenWidth = config.screenWidth;
        this.screenHeight = config.screenHeight;
        this.map = null;
        this.numberOfGhosts = config.numberOfGhosts;
    }

    start() {
        try {
            this.validateConfig();
            this.mapRenderer = new LevelRenderer(this.screenWidth, this.screenHeight, this.map);
            this.pacman = new Pacman();

            this.mapRenderer.renderMap();
            this.pacman.render(document.body);

            // this.createAndRenderGhosts(); // Uncomment only if needed
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error gracefully
        }
    }

    validateConfig() {
        if (!config || typeof config !== 'object') {
            throw new Error('Invalid config object');
        }

        if (!config.screenWidth || typeof config.screenWidth !== 'number') {
            throw new Error('Invalid screenWidth value');
        }

        if (!config.screenHeight || typeof config.screenHeight !== 'number') {
            throw new Error('Invalid screenHeight value');
        }

        // Add validation for other properties if needed
    }

    // createAndRenderGhosts() {
    //     this.ghosts = [];
    //     for (let i = 0; i < this.numberOfGhosts; i++) {
    //         const ghost = new Ghost();
    //         ghost.render();
    //         this.ghosts.push(ghost);
    //     }
    // }
}

