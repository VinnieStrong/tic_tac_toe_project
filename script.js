const gameBoard = (function() {

    const board = [0,1,2,3,4,5,6,7,8];
    const printBoard = function() {
        console.log(board[6],board[7], board[8]);
        console.log(board[3],board[4], board[5]);
        console.log(board[0],board[1], board[2]);
    }    
    return { board, printBoard };

})();


const players = (function() {

    const createPlayer = function(name, mark) {
        return { name, mark };
    }

    let player1 = createPlayer('Vince', 'X');
    let player2 = createPlayer('Dani', 'O');

    return  { createPlayer, player1, player2 } ;

})();


const gameLogic = (function() {

    //Initiate current player
    let currentPlayer = players.player1;

    //
    const switchPlayer = function() {
        if (currentPlayer === players.player1) {
            currentPlayer = players.player2; 
        } else {
            currentPlayer = players.player1;
        }
    };

    const makeMove = function(position) {

        console.log(`${currentPlayer.name} is your turn`);
    
        if (gameBoard.board[position] === 'X' || gameBoard.board[position] === 'O') {
            console.log('This spot is already been taken');
        }
        else {
            gameBoard.board[position] = currentPlayer.mark;
            gameBoard.printBoard();
            if (checkWin()) {
                console.log(`${currentPlayer.name}, you won! 🎉`);
            }
            switchPlayer();
        }
    };

    //const play = function() {
        
    //}

    const checkWin = function() {
        if (
            (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2]) || 
            (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5]) || 
            (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8]) || 
            (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6]) || 
            (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7]) || 
            (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8]) || 
            (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8]) || 
            (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6]) 
        ) { return true; }
        return false;
    };

    const printCurrentPlayer = function() {
        const currentDisplay = document.createElement('p');
        currentDisplay.textContent = `${gameLogic.currentPlayer.name} is your turn, make a move!`;
        document.getElementById('hanger').appendChild(currentDisplay);
    }

    const startGame = function() {
        startButton.addEventListener('click', () => {
            printCurrentPlayer();

        })
    }


return { switchPlayer, makeMove, checkWin, currentPlayer  }
})();

const display = (function() {
    
    const hanger = document.getElementsByClassName('hanger');
    const topLeftCell = document.getElementById('top-left');
    const topCell = document.getElementById('top');
    const topRightCell = document.getElementById('top-right');
    const midLeftCell = document.getElementById('mid-left');
    const centerCell = document.getElementById('center');
    const midRightCell = document.getElementById('mid-right');
    const bottomLeftCell = document.getElementById('bottom-left');
    const bottomCell = document.getElementById('bottom');
    const bottomRightCell = document.getElementById('bottom-right');

    const render = function() {
        bottomLeftCell.textContent = `${gameBoard.board[0]}`;
        bottomCell.textContent = `${gameBoard.board[1]}`;
        bottomRightCell.textContent = `${gameBoard.board[2]}`;
        midLeftCell.textContent = `${gameBoard.board[3]}`;
        centerCell.textContent = `${gameBoard.board[4]}`;
        midRightCell.textContent = `${gameBoard.board[5]}`;
        topLeftCell.textContent = `${gameBoard.board[6]}`;
        topCell.textContent = `${gameBoard.board[7]}`;
        topRightCell.textContent = `${gameBoard.board[8]}`;
    }

    topLeftCell.addEventListener('click', () => {
        gameBoard.board[6] = gameLogic.currentPlayer.mark;
        render();
    })
    topCell.addEventListener('click', () => {
        gameBoard.board[7] = gameLogic.currentPlayer.mark;
        render();
    })
    topRightCell.addEventListener('click', () => {
        gameBoard.board[8] = gameLogic.currentPlayer.mark;
        render();
    })
    midLeftCell.addEventListener('click', () => {
        gameBoard.board[3] = gameLogic.currentPlayer.mark;
        render();
        })
    centerCell.addEventListener('click', () => {
        gameBoard.board[4] = gameLogic.currentPlayer.mark;
        render();    
        })
    midRightCell.addEventListener('click', () => {
        gameBoard.board[5] = gameLogic.currentPlayer.mark;
        render();   
        })
    bottomLeftCell.addEventListener('click', () => {
        gameBoard.board[0] = gameLogic.currentPlayer.mark;
        render();    
        })
    bottomCell.addEventListener('click', () => {
        gameBoard.board[1] = gameLogic.currentPlayer.mark;
        render();
    })
    bottomRightCell.addEventListener('click', () => {
        gameBoard.board[2] = gameLogic.currentPlayer.mark;
        render();
    })

    return {hanger, gameBoard, render}


})();

const test = function() {

}

const startButton = document.createElement('button');
const buttonText = document.createTextNode('start the game');
startButton.appendChild(buttonText);
document.getElementById('hanger').appendChild(startButton);
startButton.addEventListener('click', () => {
    const currentDisplay = document.createElement('p');
    currentDisplay.textContent = `${gameLogic.currentPlayer.name} is your turn`;
    document.getElementById('hanger').appendChild(currentDisplay);
})


gameLogic.makeMove();


