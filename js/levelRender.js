const screen = document.querySelector('body');

const Pacman_MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 6, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const object = ['wall', 'dot', 'empty', 'ghost', 'coin', 'pacman', 'super'];

// Create SVG element and append it to the map div
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const cellSize = (screenWidth / screenHeight) * 25;
const radius = cellSize / 4;
screen.innerHTML = '';

// Create a div for the map
const mapDiv = document.createElement('div');
mapDiv.classList.add('map');
screen.appendChild(mapDiv);


function renderMap(map) {
    // Clear the screen
    const svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMap.classList.add('walls');
    svgMap.setAttribute("width", cellSize * map[0].length);
    svgMap.setAttribute("height", cellSize * map.length);
    mapDiv.appendChild(svgMap);

    // Create group for cells map
    const cellsGroupMap = document.createElementNS("http://www.w3.org/2000/svg", "g");
    cellsGroupMap.classList.add('cells');
    svgMap.appendChild(cellsGroupMap);

    // Create rectangles and circles for each cell
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const x = j * cellSize;
            const y = i * cellSize;
            
            switch(cell){

                // render 'wall' 
                case 0:
                    const cellElementWall = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    cellElementWall.setAttribute("class", `cell ${object[cell]}`);
                    cellElementWall.setAttribute("x", x);
                    cellElementWall.setAttribute("y", y);
                    cellElementWall.setAttribute("width", cellSize);
                    cellElementWall.setAttribute("height", cellSize);
                    cellsGroupMap.appendChild(cellElementWall);
                    break;
                    // render 'dot' 
                case 1:
                    const cellElementDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    cellElementDot.setAttribute("class", `cell ${object[cell]}`);
                    const dotCx = x + radius * 2; // Изменение названия переменной cx на dotCx
                    const dotCy = y + radius * 2; // Изменение названия переменной cy на dotCy
                    cellElementDot.setAttribute("cx", dotCx);
                    cellElementDot.setAttribute("cy", dotCy);
                    cellElementDot.setAttribute("r", radius / 2.5);
                    cellsGroupMap.appendChild(cellElementDot);
                    break;
                    

                // render 'empty' 
                case 2:
                    // Do nothing for empty cell
                    break;

                // render 'coin' 
                case 4:
                    const cellElementCoin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    cellElementCoin.setAttribute("class", `cell ${object[cell]}`);
                    const coinCx = x + radius * 2;
                    const coinCy = y + radius * 2;
                    cellElementCoin.setAttribute("cx", coinCx);
                    cellElementCoin.setAttribute("cy", coinCy);
                    cellElementCoin.setAttribute("r", radius * 1.2);
                    cellsGroupMap.appendChild(cellElementCoin);
                    break;
            }
        }
    }
}

function renderPacman(map) {

    const svgPacman = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgPacman.classList.add('pacman');
    svgPacman.setAttribute("width", cellSize * map[0].length);
    svgPacman.setAttribute("height", cellSize * map.length);
    mapDiv.appendChild(svgPacman);

    // Create group for cells 
    const cellsGroupPacman = document.createElementNS("http://www.w3.org/2000/svg", "g");
    cellsGroupPacman.classList.add('cellsPacman');
    svgPacman.appendChild(cellsGroupPacman);

  
    // Create rectangles and circles for each cell
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const x = j * cellSize;
            const y = i * cellSize;
            
            if (cell === 5) {
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                const rectSize = radius * 2;
                let openTop = 40;
                let openBottom = 140;
                let lastTimestamp = null;
                const animationInterval = 6500 / 60; // Roughly 60 frames per second

                function animatePacman(timestamp) {
                    if (!lastTimestamp) lastTimestamp = timestamp;
                    const deltaTime = timestamp - lastTimestamp;
            
                    // If enough time has passed for the next frame
                    if (deltaTime >= animationInterval) {
                        // Set opening and closing angles of mouth
                        openTop = openTop === 40 ? 0: 40; // If mouth is open, close it, and vice versa
                        openBottom = openBottom === 140 ? 170 : 140;
            
                        // Set transform attributes for top and bottom part of Pacman
                        topPack.setAttribute("transform", `rotate(${openTop}, ${cx}, ${cy})`);
                        bottomPack.setAttribute("transform", `rotate(${openBottom}, ${cx}, ${cy})`);
            
                        // Update last frame timestamp
                        lastTimestamp = timestamp;
                    }
            
                    // Request next frame
                    requestAnimationFrame(animatePacman);
                }
            
                // Start animation
                requestAnimationFrame(animatePacman);

                // Creating mask for top half of Pacman
                const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                maskTop.setAttribute("id", `maskTop-${object[cell]}`);
                cellsGroupPacman.appendChild(maskTop);
                
                // Rectangle inside the mask to control the size
                const maskTopRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                maskTopRect.setAttribute("x", cx - radius * 2);
                maskTopRect.setAttribute("y", cy);
                maskTopRect.setAttribute("width", rectSize * 2);
                maskTopRect.setAttribute("height", rectSize * 2);
                maskTopRect.setAttribute("fill", "white");
                maskTop.appendChild(maskTopRect);
                
                // Applying mask to the top half of Pacman
                const topPack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                topPack.setAttribute("class", `cell ${object[cell]} pac-body-top`);
                topPack.setAttribute("cx", cx);
                topPack.setAttribute("cy", cy);
                topPack.setAttribute("r", radius * 1.8);
                topPack.setAttribute("mask", `url(#maskTop-${object[cell]})`);
                topPack.setAttribute("transform", `rotate(${openTop}, ${cx}, ${cy})`);
                cellsGroupPacman.appendChild(topPack);
            
                // Creating mask for bottom half of Pacman
                const maskBottom = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                maskBottom.setAttribute("id", `maskBottom-${object[cell]}`);
                cellsGroupPacman.appendChild(maskBottom);
            
                // Rectangle inside the mask to control the size
                const maskBottomRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                maskBottomRect.setAttribute("x", cx - radius * 2);
                maskBottomRect.setAttribute("y", cy);
                maskBottomRect.setAttribute("width", rectSize * 2);
                maskBottomRect.setAttribute("height", rectSize*2);
                maskBottomRect.setAttribute("fill", "white");
                maskBottom.appendChild(maskBottomRect);
            
                // Applying mask to the bottom half of Pacman
                const bottomPack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                bottomPack.setAttribute("class", `cell ${object[cell]} pac-body-bottom`);
                bottomPack.setAttribute("cx", cx);
                bottomPack.setAttribute("cy", cy);
                bottomPack.setAttribute("r", radius * 1.8);
                bottomPack.setAttribute("mask", `url(#maskBottom-${object[cell]})`);
                bottomPack.setAttribute("transform", `rotate(${openBottom}, ${cx}, ${cy})`);
                cellsGroupPacman.appendChild(bottomPack);              
                
            }

        }
    }
}


// Showing map
renderMap(Pacman_MAP);

renderPacman(Pacman_MAP);
