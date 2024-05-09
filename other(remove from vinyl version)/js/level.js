import { config } from "./config.js"; 

class GameMap {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.cellSize = (screenWidth / screenHeight) * 25;
        this.radius = this.cellSize / 4;
        this.mapDiv = document.createElement('div');
        this.mapDiv.classList.add('level');
        document.body.appendChild(this.mapDiv);
    }

    renderMap(map) {
        // Очищаем экран
        const svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgMap.classList.add('map');
        svgMap.setAttribute("width", this.cellSize * map[0].length);
        svgMap.setAttribute("height", this.cellSize * map.length);
        this.mapDiv.appendChild(svgMap);

        // Создаем группу для ячеек карты
        const cellsGroupMap = document.createElementNS("http://www.w3.org/2000/svg", "g");
        cellsGroupMap.classList.add('cells');
        svgMap.appendChild(cellsGroupMap);

        // Создаем прямоугольники и круги для каждой ячейки
        for (let i = 0; i < map.length; i++) {
            const row = map[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const x = j * this.cellSize;
                const y = i * this.cellSize;
                
                switch(cell){
                    case 0: // 'wall'
                        const cellElementWall = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        cellElementWall.setAttribute("class", `cell ${config.object[cell]}`);
                        cellElementWall.setAttribute("x", x);
                        cellElementWall.setAttribute("y", y);
                        cellElementWall.setAttribute("width", this.cellSize);
                        cellElementWall.setAttribute("height", this.cellSize);
                        cellsGroupMap.appendChild(cellElementWall);
                        break;
                    case 1: // 'dot'
                        const cellElementDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        cellElementDot.setAttribute("class", `cell ${config.object[cell]}`);
                        const dotCx = x + this.radius * 2;
                        const dotCy = y + this.radius * 2;
                        cellElementDot.setAttribute("cx", dotCx);
                        cellElementDot.setAttribute("cy", dotCy);
                        cellElementDot.setAttribute("r", this.radius / 2.5);
                        cellsGroupMap.appendChild(cellElementDot);
                        break;
                    case 2: // 'empty'
                        // Ничего не делаем для пустой ячейки
                        break;
                    case 4: // 'coin'
                        const cellElementCoin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        cellElementCoin.setAttribute("class", `cell ${config.object[cell]}`);
                        const coinCx = x + this.radius * 2;
                        const coinCy = y + this.radius * 2;
                        cellElementCoin.setAttribute("cx", coinCx);
                        cellElementCoin.setAttribute("cy", coinCy);
                        cellElementCoin.setAttribute("r", this.radius * 1.2);
                        cellsGroupMap.appendChild(cellElementCoin);
                        break;
                }
            }
        }
    }
}

// Создаем экземпляр класса и отображаем карту игры
const LevelRenderer = new GameMap(window.innerWidth, window.innerHeight);
LevelRenderer.renderMap(config.map);

export { LevelRenderer };
