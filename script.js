// Criar o tabuleiro 7x6 com array 2d
// Kaio
// Criar o tabuleiro html
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]
//colocando o tabuleiro no html

let tabuleiro = document.getElementById("tabuleiro")
tabuleiro.classList.add("tabuleiro")

const table = () => {
    for (let col = 0; col < board[0].length; col++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")

        for (let row = 0; row < board.length; row++) {
            let celula = document.createElement("div")
            celula.classList.add("celula")
            celula.dataset.columnNumber = col
            celula.dataset.rowNumber = row
            celula.dataset.coord = `${col}${row}`
            /* console.log("row:", row)
            console.log("column:" ,col) */
            coluna.appendChild(celula)
        }
        tabuleiro.appendChild(coluna)
    }
}
table()

// Kaio

//Osmar
// Criar 1 variável pra guardar o jogador da vez
let jogadorAtual = "black"; //black ou red
// Criar a função pra posicionar o disco 
// receber o jogadorAtual e no final da função fazer a mudança do jogadorAtual e já chama a função de verificação
// Criar um handler de clique para cada coluna 

const posicionarDisco = (event) => {
    const cell = event.target;
    let col = cell.dataset["columnNumber"];
    if (typeof col === 'undefined')
        col = cell.parentElement.dataset["columnNumber"];
    let flag = false;
    //criar disco
    let disc = document.createElement("div");
    disc.classList.add("discos");
    disc.classList.add(jogadorAtual);

    //   jogadas++;
    for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][col] === 0) {
            document.querySelector(`[data-coord="${col}${i}"]`).appendChild(disc);
            let elem = document.querySelector(`[data-coord="${col}${i}"]`).firstChild;
            
            let posDestino = elem.offsetTop;
            let firstElem = document.querySelector(`[data-coord="${col}0"]`);
            let posInicial = firstElem.offsetTop;
            
            elem.animate([
                // keyframes
                { top: posInicial+"px"},
                { top: posDestino+"px"}
            ], {
                // timing options
                duration: 500,
                iterations: 1
            });

            if (jogadorAtual === "black") {
                board[i][col] = 1;
            } else {
                board[i][col] = 2;
            }
            flag = true;
            break;
        }
    }
    if (verificaVitoria(board) || verificarEmpate(board))
        removeListener();
    if (flag === true){
        jogadorAtual = trocaJogador(jogadorAtual);
        flag = false;
    }
}

const trocaJogador = (player) => {
    if (player === "black"){
        return "red"}
        if (player === "red"){
            return "black"}
}

// adicionando evento ao tabuleiro
const addListener = (player) => {
    const colunas = document.getElementsByClassName("coluna");
    for (let i = 0; i < colunas.length; i++) {
        colunas[i].addEventListener('click', posicionarDisco);
    }
}
addListener();

const removeListener = (player) => {
    const colunas = document.getElementsByClassName("coluna");
    for (let i = 0; i < colunas.length; i++) {
        colunas[i].removeEventListener('click', posicionarDisco);
    }
}

// Criar a função de verificação de vitória
const verificaVitoria = (board) => {

    const limiteX = board[0].length - 3;
    const limiteY = board.length - 3;

    let msgDeVitoria = document.querySelector('#msgDeVitoria')
    msgDeVitoria.innerHTML = '';

    // checagem horizontal
    for (let row = 0; row < board.length; row++) {

        for (let col = 0; col < limiteX; col++) {
            let cell = board[row][col];

            if (cell !== 0) {
                let horizontalChecker = 0;
                let winnerCoords = [`${col}${row}`];

                for (let count = 1; count < 4; count++) {
                    if (cell === board[row][col + count]) {
                        winnerCoords.push(`${col + count}${row}`)
                        horizontalChecker++;
                    }
                    if (horizontalChecker === 3) {
                        highlightWinner(winnerCoords);
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência horizontal na linha ${row + 1}!`
                        return true;
                    }
                }
            }
        }
    }

    //checagem vertical
    for (let row = 0; row < limiteY; row++) {

        for (let col = 0; col < board[0].length; col++) {
            cell = board[row][col];

            if (cell !== 0) {
                let verticalChecker = 0;
                let winnerCoords = [`${col}${row}`];

                for (let count = 1; count < 4; count++) {
                    if (cell === board[row + count][col]) {
                        winnerCoords.push(`${col}${row + count}`)
                        verticalChecker++;
                    }
                    if (verticalChecker === 3) {
                        highlightWinner(winnerCoords);
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência vertical na coluna ${col + 1}`
                        return true;

                    }
                }
            }
        }
    }

    //checagem diagonal (direita-abaixo)
    for (let row = 0; row < limiteY; row++) {

        for (let col = 0; col < limiteX; col++) {
            cell = board[row][col];

            if (cell !== 0) {
                let diagonalChecker = 0;
                let winnerCoords = [`${col}${row}`]

                for (let count = 1; count < 4; count++) {
                    if (cell === board[row + count][col + count]) {
                        winnerCoords.push(`${col + count}${row + count}`)
                        diagonalChecker++;
                    }
                    if (diagonalChecker === 3) {
                        highlightWinner(winnerCoords);
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência diagonal (direita-abaixo) da coluna ${col + 1} até a coluna ${col + 1 + count}`
                        return true;
                    }
                }
            }
        }
    }
    // checagem diagonal (esquerda-abaixo)
    for (let row = 0; row < limiteY; row++) {

        for (let col = 3; col < board[0].length; col++) {
            cell = board[row][col];

            if (cell !== 0) {
                let diagonalChecker = 0;
                let winnerCoords = [`${col}${row}`]

                for (let count = 1; count < 4; count++) {
                    if (cell === board[row + count][col - count]) {
                        winnerCoords.push(`${col - count}${row + count}`)
                        diagonalChecker++;
                    }
                    if (diagonalChecker === 3) {
                        highlightWinner(winnerCoords);
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência diagonal (esquerda-abaixo) da coluna ${col + 1} até a coluna ${col + 1 - count}`
                        return true;

                    }
                }
            }
        }
    }
    return false;
}
// Eduardo
// Criar a função de verificação de empate
const verificarEmpate = (board) => {
    let drawChecker = 0;
    for (let col = 0; col < board[0].length; col++) {
        if (board[0][col] !== 0) {
            drawChecker++;
        }
        if (drawChecker === 7) {
            return msgDeVitoria.innerText = 'Empatou!'
        }
    }
}
// Lucas
// Criar uma função pra verificar a quantidade de elementos na coluna, quando todas estiverem completas, deu empate

const resetGame = () => {

    addListener();

    for (let col = 0; col < board[0].length; col++) {

        for (let row = 0; row < board.length; row++) {

            let currentCell = document.querySelector(`[data-coord="${col}${row}"]`);
            currentCell.innerHTML = '';
            currentCell.classList.remove('winner');

            board[row][col] = 0;

        }
    }
    

}
const resetButton = document.querySelector('#resetBtn');
resetButton.addEventListener('click', resetGame);

const highlightWinner = (winnerCoordsArray) => {

    for (let i = 0; i < 4; i++) {
        let currentElement = document.querySelector(`[data-coord="${winnerCoordsArray[i]}"]`);
        currentElement.firstChild.classList.add('winner');
    }

}