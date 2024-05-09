import { config } from './config.js';
import { LevelRenderer } from './level.js';
import { pacman } from './pacman.js';
// import { Ghost } from './ghost.js';

export class Game {
    constructor() {
        this.screenWidth = config.screenWidth;
        this.screenHeight = config.screenHeight;
        this.map;
        this.numberOfGhosts = config.numberOfGhosts;

    }

    start() {
        this.mapRenderer = new LevelRenderer(this.screenWidth, this.screenHeight, this.map);
        this.pacman = new pacman();
        // this.ghosts = [];

        this.LevelRenderer.renderMap();
        this.pacman.render(document.body);
        // for (let i = 0; i < this.numberOfGhosts; i++) {
        //     const ghost = new Ghost();
        //     ghost.render();
        //     this.ghosts.push(ghost);
        // }
    }
}
