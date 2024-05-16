import { config } from "./config.js";

class Pacman {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
        this.animationInterval = 6500 / 60; // Approximately 60 frames per second
        this.openTop = 40;
        this.openBottom = 140;
        this.lastTimestamp = null;
        this.level = document.querySelector('.level');

        this.render();
        this.startAnimation();
    }

    // Animate the Pacman's mouth opening and closing
    animate(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = timestamp - this.lastTimestamp;

        if (deltaTime >= this.animationInterval) {
            this.animateMouth(timestamp);
            this.lastTimestamp = timestamp;
        }
        requestAnimationFrame((timestamp) => this.animate(timestamp));
    }

    // Animate the Pacman's mouth opening and closing
    animateMouth(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = timestamp - this.lastTimestamp;
        const topPack = document.querySelector(".top");
        const bottomPack = document.querySelector(".bottom");
        const cx = this.x;
        const cy = this.y;

        if (deltaTime >= this.animationInterval) {
            this.openTop = this.openTop === 40 ? 0 : 40;
            this.openBottom = this.openBottom === 140 ? 170 : 140;

            topPack.setAttribute("transform", `rotate(${this.openTop}, ${cx}, ${cy})`);
            bottomPack.setAttribute("transform", `rotate(${this.openBottom}, ${cx}, ${cy})`);

            this.lastTimestamp = timestamp;
        }
    }

    // Render the Pacman SVG and its components
    render() {
        const svgPacman = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgPacman.classList.add('pacman');
        svgPacman.setAttribute("width", config.cellSize * config.map[0].length);
        svgPacman.setAttribute("height", config.cellSize * config.map.length);
        this.level.appendChild(svgPacman);

        const topGroupPacman = document.createElementNS("http://www.w3.org/2000/svg", "g");
        topGroupPacman.classList.add('top');
        svgPacman.appendChild(topGroupPacman);

        const bottomGroupPacman = document.createElementNS("http://www.w3.org/2000/svg", "g");
        bottomGroupPacman.classList.add('bottom');
        svgPacman.appendChild(bottomGroupPacman);

        for (let i = 0; i < config.map.length; i++) {
            const row = config.map[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const x = j * config.cellSize;
                const y = i * config.cellSize;

                if (cell === 5) {
                    const cx = x + config.radius * 2;
                    const cy = y + config.radius * 2;

                    const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                    maskTop.setAttribute("id", `maskTop-${config.object[cell]}`);
                    topGroupPacman.appendChild(maskTop);

                    const maskTopRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    maskTopRect.setAttribute("x", cx - config.radius * 2);
                    maskTopRect.setAttribute("y", cy);
                    maskTopRect.setAttribute("width", config.radius * 4);
                    maskTopRect.setAttribute("height", config.radius * 4);
                    maskTopRect.setAttribute("fill", "white");
                    maskTop.appendChild(maskTopRect);

                    const topPack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    topPack.setAttribute("class", `cell ${config.object[cell]} pac-body-top`);
                    topPack.setAttribute("cx", cx);
                    topPack.setAttribute("cy", cy);
                    topPack.setAttribute("r", config.radius * 1.8);
                    topPack.setAttribute("mask", `url(#maskTop-${config.object[cell]})`);
                    topGroupPacman.appendChild(topPack);
                    topGroupPacman.setAttribute("transform", `rotate(${this.openTop}, ${cx}, ${cy})`);
                }

                if (cell === 5) {
                    const cx = x + config.radius * 2;
                    const cy = y + config.radius * 2;

                    const maskBottom = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                    maskBottom.setAttribute("id", `maskBottom-${config.object[cell]}`);
                    bottomGroupPacman.appendChild(maskBottom);

                    const maskBottomRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    maskBottomRect.setAttribute("x", cx - config.radius * 2);
                    maskBottomRect.setAttribute("y", cy);
                    maskBottomRect.setAttribute("width", config.radius * 4);
                    maskBottomRect.setAttribute("height", config.radius * 4);
                    maskBottomRect.setAttribute("fill", "white");
                    maskBottom.appendChild(maskBottomRect);

                    const bottomPack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    bottomPack.setAttribute("class", `cell ${config.object[cell]} pac-body-bottom`);
                    bottomPack.setAttribute("r", config.radius * 1.8);
                    bottomPack.setAttribute("mask", `url(#maskBottom-${config.object[cell]})`);
                    bottomGroupPacman.appendChild(bottomPack);
                    bottomPack.setAttribute("cx", cx);
                    bottomPack.setAttribute("cy", cy);
                    bottomGroupPacman.setAttribute("transform", `rotate(${this.openBottom}, ${cx}, ${cy})`);
                }
            }
        }
    }

    // Start the animation loop
    startAnimation() {
        const animateFrame = (timestamp) => {
            this.animateMouth(timestamp);
            requestAnimationFrame(animateFrame);
        };
        requestAnimationFrame(animateFrame);
    }
}

const pacman = new Pacman();

export { pacman };

