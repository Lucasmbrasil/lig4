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
let container = document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)

const tabuleiro = () =>{
    for (let col = 0; col < board[0].length; col++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")
        
        for (let row = 0; row < board.length; row++) {
            let celula = document.createElement("div")
            celula.classList.add("celula")
            celula.dataset.columnNumber = col
            celula.dataset.rowNumber = row
            console.log("row:", row)
            console.log("column:" ,col)
            coluna.appendChild(celula)
        }
        container.appendChild(coluna)
    }
}
tabuleiro()

    // Kaio
// Criar 1 variável pra cada jogador
// let jogador1 =
// let jogador2 =
// Criar 1 variável pra guardar o jogador da vez
// let jogadorAtual =
// Criar a função pra posicionar o disco 
function posicionarDisco(){
// receber o jogadorAtual e no final da função fazer a mudança do jogadorAtual e já chama a função de verificação
// Criar um handler de clique para cada coluna 
    // Osmar
}

// Criar a função de verificação de vitória
const verificaVitoria = (board) => {

    const limiteX = board[0].length - 4;
    const limiteY = board.length - 4;

    let msgDeVitoria = document.querySelector('#msgDeVitoria')
    msgDeVitoria.innerHTML = '';

    // checagem horizontal
    for (let row = 0; row < board.length; row++) {
        
        for (let col = 0; col < limiteX; col++) {
            let cell = board[row][col];

            if (cell !== 0) {
                let horizontalChecker = 0;

                for (let count = 0; count < 4; count++) {
                    if (cell === board[row][col + count]) {
                        horizontalChecker++;
                    }
                    if (horizontalChecker === 3) {
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência horizontal na linha ${row}!`
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

                for (let count = 0; count < 4; count++) {
                    if (cell === board[row + count][col]) {
                        verticalChecker++;
                    }
                    if (verticalChecker === 3) {
                        msgDeVitoria.innerText = `O jogador ${cell} vence o jogo com uma sequência vertical na coluna ${col}`
                    }
                }
            }
        }
    }

    //checagem diagonal (direita-abaixo)
}
verificaVitoria(board);
    // Eduardo
// Criar a função de verificação de empate
function verificarEmpate(){}
    // Lucas
// Criar uma função pra verificar a quantidade de elementos na coluna, quando todas estiverem completas, deu empate