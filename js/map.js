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

function renderMap(map) {
    // Очищаем экран
    screen.innerHTML = '';

    // Создаем div для карты
    const mapDiv = document.createElement('div');
    mapDiv.classList.add('map');
    screen.appendChild(mapDiv);

    // Создаем SVG элемент и добавляем его к div для карты
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cellSize = (screenWidth / screenHeight) * 7;
    const radius = cellSize / 4;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", cellSize * map[0].length);
    svg.setAttribute("height", cellSize * map.length);
    mapDiv.appendChild(svg);

    // Создаем группу для ячеек
    const cellsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    cellsGroup.classList.add('cells');
    svg.appendChild(cellsGroup);

    // Создаем прямоугольники и круги для каждой ячейки
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const x = j * cellSize;
            const y = i * cellSize;
            // render 'wall'
            if (cell === 0) {
                const cellElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                cellElement.setAttribute("class", `cell ${object[cell]}`);
                cellElement.setAttribute("x", x);
                cellElement.setAttribute("y", y);
                cellElement.setAttribute("width", cellSize);
                cellElement.setAttribute("height", cellSize);
                cellsGroup.appendChild(cellElement);
            }

            // render 'dot' 
            else if (cell === 1) {
                const cellElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cellElement.setAttribute("class", `cell ${object[cell]}`);
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                cellElement.setAttribute("cx", cx);
                cellElement.setAttribute("cy", cy);
                cellElement.setAttribute("r", radius / 2.5);
                cellsGroup.appendChild(cellElement);
            }

            // render 'empty' 
            else if (cell === 2) {
                // Do nothing for empty cell
            }

            // render 'ghost' 
            else if (cell === 3) {
                const cellElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cellElement.setAttribute("class", `cell ${object[cell]}`);
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                cellElement.setAttribute("cx", cx);
                cellElement.setAttribute("cy", cy);
                cellElement.setAttribute("r", radius * 1.5);
                cellsGroup.appendChild(cellElement);
            }

            // render 'coin' 
            else if (cell === 4) {
                const cellElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cellElement.setAttribute("class", `cell ${object[cell]}`);
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                cellElement.setAttribute("cx", cx);
                cellElement.setAttribute("cy", cy);
                cellElement.setAttribute("r", radius * 1.2);
                cellsGroup.appendChild(cellElement);
            }

            // render 'pacman' 
            else if (cell === 5) {
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                const rectSize = radius * 2;
                let openTop = 40;
                let openBottom = 140;
                let lastTimestamp = null;
                const animationInterval = 6500 / 60; // Примерно 60 кадров в секунду

                function animatePacman(timestamp) {
                    if (!lastTimestamp) lastTimestamp = timestamp;
                    const deltaTime = timestamp - lastTimestamp;
            
                    // Если прошло достаточное количество времени для следующего кадра
                    if (deltaTime >= animationInterval) {
                        // Устанавливаем углы открытия и закрытия рта
                        openTop = openTop === 40 ? 0: 40; // Если рот открыт, закрыть, и наоборот
                        openBottom = openBottom === 140 ? 180 : 140;
            
                        // Устанавливаем атрибуты transform для верхней и нижней части Пакмана
                        topPack.setAttribute("transform", `rotate(${openTop}, ${cx}, ${cy})`);
                        bottomPack.setAttribute("transform", `rotate(${openBottom}, ${cx}, ${cy})`);
            
                        // Обновляем метку времени последнего кадра
                        lastTimestamp = timestamp;
                    }
            
                    // Запрашиваем следующий кадр
                    requestAnimationFrame(animatePacman);
                }
            
                // Запускаем анимацию
                requestAnimationFrame(animatePacman);

                // Creating mask for top half of Pacman
                const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                maskTop.setAttribute("id", `maskTop-${object[cell]}`);
                cellsGroup.appendChild(maskTop);
                
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
                cellsGroup.appendChild(topPack);
            
                // Creating mask for bottom half of Pacman
                const maskBottom = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                maskBottom.setAttribute("id", `maskBottom-${object[cell]}`);
                cellsGroup.appendChild(maskBottom);
            
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
                cellsGroup.appendChild(bottomPack);              
                
            }
            

            // render 'super' 
            else if (cell === 6) {
                const cellElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                cellElement.setAttribute("class", `cell ${object[cell]}`);
                const cx = x + radius * 2;
                const cy = y + radius * 2;
                cellElement.setAttribute("cx", cx);
                cellElement.setAttribute("cy", cy);
                cellElement.setAttribute("r", radius);
                cellsGroup.appendChild(cellElement);
            }
        }
    }
}




// Showing map
renderMap(Pacman_MAP);
