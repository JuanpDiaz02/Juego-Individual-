document.addEventListener('DOMContentLoaded', () => {
    const crosswordData = [
        { word: "YAGUARETE", hint: "Felino más grande de América del Sur", x: 0, y: 0, direction: "horizontal" },
        { word: "HORNERO", hint: "Ave nacional de Argentina", x: 0, y: 1, direction: "horizontal" },
        { word: "PUMA", hint: "Mamífero carnívoro de la familia Felidae nativo de América.", x: 0, y: 2, direction: "horizontal" },
        { word: "CAUQUEN", hint: "Un ave migratoria con distribución global restringida al centro y sur de Argentina y Chile.", x: 0, y: 3, direction: "horizontal" },
        { word: "CARPINCHO", hint: "El roedor más grande del mundo", x: 0, y: 4, direction: "horizontal" },
        { word: "TAPIR", hint: "Herbívoro con una trompa corta", x: 0, y: 5, direction: "horizontal" },
        { word: "HUEMUL", hint: "Venado en peligro de extinción que habita en la cordillera de los Andes en los bosques andino patagónicos.", x: 0, y: 6, direction: "horizontal" },
        { word: "SURI", hint: "Ave no voladora parecida al avestruz, su habitat es la patagonia.", x: 0, y: 7, direction: "horizontal" }
    ];

    const crossword = document.getElementById('crucigrama');
    const clues = document.getElementById('pistas');
    const checkAnswerButton = document.getElementById('verificar-respuesta');

    let currentClueIndex = 0;

    
    const createCrosswordGrid = (rows, cols) => {
        for (let i = 0; i < rows; i++) {
            let row = crossword.insertRow();
            for (let j = 0; j < cols; j++) {
                let cell = row.insertCell();
                let input = document.createElement('input');
                input.setAttribute('maxlength', 1);
                cell.appendChild(input);
            }
        }
    };

    
    const placeWords = (data) => {
        data.forEach((item, index) => {
            let x = item.x;
            let y = item.y;
            for (let i = 0; i < item.word.length; i++) {
                if (item.word[i] !== ' ') {
                    let cell = crossword.rows[y].cells[x].firstChild;
                    cell.setAttribute('data-letter', item.word[i].toUpperCase());
                }
                if (item.direction === 'down') y++;
                else x++;
            }
            if (item.hint) {
                let clueItem = document.createElement('li');
                clueItem.classList.add('list-group-item');
                clueItem.textContent = `${index + 1}. ${item.hint}`;
                clues.appendChild(clueItem);
            }
        });
    };

    // Verificar y avanzar
    const checkWord = (word, x, y, direction) => {
        let correct = true;
        for (let i = 0; i < word.length; i++) {
            if (word[i] !== ' ') {
                const cell = crossword.rows[y].cells[x].firstChild;
                if (cell.value.toUpperCase() !== word[i]) {
                    cell.classList.add('incorrecto');
                    cell.classList.remove('correcto');
                    correct = false;
                } else {
                    cell.classList.add('correcto');
                    cell.classList.remove('incorrecto');
                }
            }
            if (direction === 'down') y++;
            else x++;
        }
        return correct;
    };

    // Manejar la verificación de la palabra actual
    const checkCurrentWord = () => {
        const wordItem = crosswordData[currentClueIndex];
        const correct = checkWord(wordItem.word, wordItem.x, wordItem.y, wordItem.direction);

        if (correct) {
            alert("¡Correcto!");
            clues.children[currentClueIndex].classList.remove('actual');
            if (currentClueIndex + 1 < clues.children.length) {
                currentClueIndex++;
                clues.children[currentClueIndex].classList.add('actual');
            } else {
                alert("¡Felicidades! Has completado el crucigrama.");
            }
        } else {
            alert("Algunas letras son incorrectas. Por favor, revisa tu respuesta.");
        }
    };

    // Crear el tablero y colocar las palabras
    createCrosswordGrid(8, 9); // Ajuste de tamaño del tablero
    placeWords(crosswordData);

    // Mostrar la primera pista como actual
    clues.children[0].classList.add('actual');

    // Manejar eventos de entrada y verificación
    crossword.addEventListener('input', (e) => {
        const input = e.target;
        input.classList.remove('incorrecto');
        input.classList.remove('correcto');
    });
    checkAnswerButton.addEventListener('click', checkCurrentWord);
});
