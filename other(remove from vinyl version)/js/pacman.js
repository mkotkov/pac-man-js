import { config } from "./config.js"; 

class Pacman {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
        this.animationInterval = 6500 / 60; // Примерно 60 кадров в секунду
        this.openTop = 40;
        this.openBottom = 140;
        this.lastTimestamp = null;
        this.level = document.querySelector('.level');
        
        this.render();
        this.startAnimation(); 
    }

    // updatePosition() {
    //     const pacmanElement = document.querySelector('.cellsPacman');
    //     const x = this.x * config.cellSize + config.radius * 2;
    //     const y = this.y * config.cellSize + config.radius * 2;
    //     pacmanElement.setAttribute('cx', x);
    //     pacmanElement.setAttribute('cy', y);
    // }
    
    animate(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = timestamp - this.lastTimestamp;
    
        if (deltaTime >= this.animationInterval) {
            this.mouth(timestamp); // Call the correct method here
            this.lastTimestamp = timestamp;
        }
        requestAnimationFrame((timestamp) => this.animate(timestamp)); // Pass the method reference
    }
    
    // move(direction) {
    //     // Сохраняем текущие координаты
    //     const currentX = this.x;
    //     const currentY = this.y;
    
    //     // Задаем новые координаты в соответствии с направлением
    //     switch (direction) {
    //         case 'up':
    //             this.y--;
    //             break;
    //         case 'down':
    //             this.y++;
    //             break;
    //         case 'left':
    //             this.x--;
    //             break;
    //         case 'right':
    //             this.x++;
    //             break;
    //         default:
    //             break;
    //     }
           
    //     // Проверяем, остались ли новые координаты в пределах карты и являются ли они доступными для перемещения
    //     if (this.isWithinBounds() && this.isCellAvailable()) {
    //         // Обновляем позицию пакмена
    //         this.updatePosition();
    //     } else {
    //         // Если новые координаты находятся за пределами карты или на недоступной ячейке, возвращаемся к предыдущим координатам
    //         this.x = currentX;
    //         this.y = currentY;
    //     }
    // }
    
    mouth(timestamp){
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = timestamp - this.lastTimestamp;
        const topPack = document.querySelector(".top");
        const bottomPack = document.querySelector(".bottom");
        const cx = this.x 
        const cy = this.y
        // If enough time has passed for the next frame
        if (deltaTime >= this.animationInterval) {
            // Set opening and closing angles of mouth
            this.openTop = this.openTop === 40 ? 0: 40; // Исправлено на this.openTop
            this.openBottom = this.openBottom === 140 ? 170 : 140; // Исправлено на this.openBottom
    
            // Set transform attributes for top and bottom part of Pacman
            topPack.setAttribute("transform", `rotate(${this.openTop}, ${cx}, ${cy})`);

            bottomPack.setAttribute("transform", `rotate(${this.openBottom}, ${cx}, ${cy})`); 
    
            // Update last frame timestamp
            this.lastTimestamp = timestamp;
        }
    }
    

    // isWithinBounds() {
    //     return this.x >= 0 && this.x < config.map[0].length && this.y >= 0 && this.y < config.map.length;
    // }

    // isCellAvailable() {
    //     const cellValue = config.map[this.y][this.x];
    //     return cellValue === 1 || cellValue === 2;
    // }
    
    
    render() {
        const svgPacman = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgPacman.classList.add('pacman');
        svgPacman.setAttribute("width", config.cellSize * config.map[0].length);
        svgPacman.setAttribute("height", config.cellSize * config.map.length);
        this.level.appendChild(svgPacman);
    
        const TopGroupPacman = document.createElementNS("http://www.w3.org/2000/svg", "g");
        TopGroupPacman.classList.add('top');
        svgPacman.appendChild(TopGroupPacman);
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
                    TopGroupPacman.appendChild(maskTop);
    
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
                    TopGroupPacman.appendChild(topPack);
                    TopGroupPacman.setAttribute("transform", `rotate(${this.openTop}, ${cx}, ${cy})`);
                }
            }
        }

        const BottomGroupPacman = document.createElementNS("http://www.w3.org/2000/svg", "g");
        BottomGroupPacman.classList.add('bottom');
        svgPacman.appendChild(BottomGroupPacman);
        for (let i = 0; i < config.map.length; i++) {
            const row = config.map[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const x = j * config.cellSize;
                const y = i * config.cellSize;
                if (cell === 5) {
                    const cx = x + config.radius * 2;
                    const cy = y + config.radius * 2;
    
                    const maskBottom = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                    maskBottom.setAttribute("id", `maskBottom-${config.object[cell]}`);
                    BottomGroupPacman.appendChild(maskBottom);
    
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
                    BottomGroupPacman.appendChild(bottomPack);
                    bottomPack.setAttribute("cx", cx);
                    bottomPack.setAttribute("cy", cy);
                    BottomGroupPacman.setAttribute("transform", `rotate(${this.openBottom}, ${cx}, ${cy})`);
    
                }
            }
        }
        
    }
    
    startAnimation() {
        const animateFrame = (timestamp) => {
            // this.move(this.direction);
            this.mouth(timestamp);
            requestAnimationFrame(animateFrame);
        };
        requestAnimationFrame(animateFrame);
    }
}

const pacman = new Pacman();

// document.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowUp':
//             pacman.move('up');
//             break;
//         case 'ArrowDown':
//             pacman.move('down');
//             break;
//         case 'ArrowLeft':
//             pacman.move('left');
//             break;
//         case 'ArrowRight':
//             pacman.move('right');
//             break;
//         default:
//             break;
//     }
// });

export { pacman };
