const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// Defino tamaño de celda y del tablero
const BLOCK_SIZE = 25;
const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;

// Asigno el tamaño al CANVAS
canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

// Escalo los puntos para que sean del tamaño del BLOCK_SIZE
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Tablero de BOARD_WITH x BOARD_HEIGHT
let board = [];
for (let y = 0; y < BOARD_HEIGHT; y++) { // Por cada fila
    board[y] = [];
    for (let x = 0; x < BOARD_WIDTH; x++) { // Por cada columna
        board[y][x] = 0;
    }
}

// Piezas
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1,0]], // S
    [[1, 1, 0], [0, 1, 1]], // Z
    [[1, 1, 1], [0, 1, 0]], // T
]

const piece = {
    position: {x: 0, y: 0},
    shape: SHAPES[3]
}
// piece.position.x = BOARD_WIDTH/2 - (piece.shape[0].length)/2;

// Game Loop
let dropCounter = 0;
let lastTime = 0;

function update (time = 0){
    // Calcula el diferencial de tiempo entre este frame y el anterior
    const deltaTime = time - lastTime;
    // Actualiza el ultimo frame
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > 1000) {
        //piece.position.y++;
        keyActions['ArrowDown']()
        dropCounter = 0;

    }
    draw();
    window.requestAnimationFrame(update);
}

function draw () {
    ctx.fillStyle = '#222'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(x, y, 1, 1);
            }
        })
    })
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle = '#f09';
                ctx.fillRect(x + piece.position.x, y + piece.position.y, 1, 1 )
            }
        })
    })
}
// Verificar colisiones
function collides(board, piece) {
    // Matriz de M x N
    const [m, n] = [piece.shape.length, piece.shape[0].length];
    for (let y = 0; y < m; y++) {
        for (let  x = 0; x < n; x++) {
            let absoluteX = piece.position.x + x;
            let absoluteY = piece.position.y + y;

            if (piece.shape[y][x] !== 0) {
                if (absoluteX < 0 || absoluteX >= BOARD_WIDTH || absoluteY >= BOARD_HEIGHT || (absoluteY !== 0 && board[absoluteY][absoluteX] !== 0) ) {
                    return true;
                }
            }
        }
    }
    return false;
}

const keyActions = {
    'ArrowLeft': () => {
        piece.position.x--;
        if (collides(board, piece)) {
            piece.position.x++;
        }
    },
    'ArrowRight': () => {
        piece.position.x++;
        if (collides(board, piece)) {
            piece.position.x--;
        }
    },
    'ArrowDown': () => {
        piece.position.y++;
        if (collides(board, piece)) {
            piece.position.y--;
            mergeWithBoard();
            removeFullLine()
        }
    },
    'ArrowUp': () => {
        const rotated = [];

        for (let i = 0; i < piece.shape[0].length; i++) {
            const row = [];

            for (let j = piece.shape.length - 1; j >= 0 ; j--) {
                row.push(piece.shape[j][i]);
            }
            rotated.push(row);
        }
        piece.shape = rotated;
    }
};

document.addEventListener('keydown', event => {
    if (keyActions[event.key]) {
        keyActions[event.key]();
    }
});

// Cuando llego abajo la pieza pasa a ser parte del tablero
function mergeWithBoard() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.position.y][x + piece.position.x] = 1;
            }
        })
    })

    //Mando la pieza de nuevo al inicio
    piece.position.x = 0;
    piece.position.y = 0;

    //Elijo una pieza al azar
    piece.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    if (collides(board, piece)) {
        window.alert('Game Over');
        board.forEach((row) => row.fill(0));
    }
}

// Eliminar lineas completas
function removeFullLine() {
    // Variable con el nuemero de filas que se pueden eliminar
    const linesToRemove = [];

    // Para cada linea del tablero
    board.forEach((row, y) => {
        // Si la linea esta completa
        if (row.every(value => value === 1)) {
            // Le paso el nro de linea a linesToRemove
            linesToRemove.push(y);
        }
    })

    // En cada linea que guarde en linesToRemove
    linesToRemove.forEach(row => {
        // Hago un splice de 1 elemento
        board.splice(row, 1);
        const newRow = Array(BOARD_WIDTH).fill(0);

        // Meto uina linea nueva por encima
        board.unshift(newRow);
    })
}

update();