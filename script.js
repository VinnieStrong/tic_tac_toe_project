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
    let gameOver = false;

    //
    const switchPlayer = function() {
        
        if (currentPlayer === players.player1) {
            currentPlayer = players.player2; 
        } else {
            currentPlayer = players.player1;
        }
        gameLogic.currentPlayer = currentPlayer;
    };

    const makeMove = function(position) {
        
        console.log(`${currentPlayer.name} is your turn`);
        display.displayOnScreen();

        if (gameBoard.board[position] === 'X' || gameBoard.board[position] === 'O') {
            console.log('This spot is already been taken');
            return;
        }
        gameBoard.board[position] = currentPlayer.mark;
        gameBoard.printBoard();

        if (checkWin()) {
            console.log(`${currentPlayer.name}, you won! 🎉`);
            document.getElementById('hanger').innerHTML = '';
            display.printOnScreen(`${currentPlayer.name} you won!`);
            gameLogic.gameOver = true;

            const newGameButton = document.createElement('button');
            newGameButton.textContent = 'Start New Game';
            document.getElementById('hanger').appendChild(newGameButton);
            newGameButton.addEventListener('click', () => {
                startGame();
            });
            return;
        } 
        else if (checkDraw()) {   
            console.log(`its a draw`);
            document.getElementById('hanger').innerHTML = '';
            display.printOnScreen(`its a draw`);
            gameLogic.gameOver = true;

            const newGameButton = document.createElement('button');
            newGameButton.textContent = 'Start New Game';
            document.getElementById('hanger').appendChild(newGameButton);
            newGameButton.addEventListener('click', () => {
                startGame();
            });
            return;
        }

        switchPlayer();
        display.displayOnScreen();
    };

    const startGame = function() {
        console.log('test');
        gameBoard.board = [0,1,2,3,4,5,6,7,8];
        display.cells.forEach((cell, index) => {
            cell.textContent = '';
        });
        gameLogic.currentPlayer = players.player1;

        document.getElementById('hanger').innerHTML = '';
        display.displayOnScreen();
        gameLogic.gameOver = false;

    }

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

    const checkDraw = function() {
        return !gameBoard.board.some(cell => typeof cell === 'number');
    };

return { switchPlayer, makeMove, checkWin, currentPlayer, startGame }
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

    const cells = document.querySelectorAll('.cell');

    const displayBoard = function() {

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (gameLogic.gameOver) return;
                gameLogic.makeMove(index);
                cell.textContent = gameBoard.board[index];     
            })
            return;
        })
        return;
    }
    displayBoard();
        
    const displayOnScreen = function() {

        const hanger = document.getElementById('hanger');
        hanger.innerHTML = '';
        hanger.textContent = `${gameLogic.currentPlayer.name} is your turn, make a move!`;

    
    }

    const printOnScreen = function(print) {

        const hanger = document.getElementById('hanger');
        hanger.innerHTML = '';
        hanger.textContent = print;

        //const currentDisplay = document.createElement('p');
        //currentDisplay.innerHTML = '';
        //currentDisplay.textContent = `${gameLogic.currentPlayer.name} is your turn, make a move!`;
        //document.getElementById('hanger').appendChild(currentDisplay);
    }


    const playNow = document.getElementById('play-now');
    const show = document.getElementById('show');
    playNow.addEventListener('click', () => {
        players.player1.name = prompt('Player1 (X), whats your name?');
        players.player2.name = prompt('Player2 (O), whats your name?');


    show.style.display = 'block';
    playNow.style.display = 'none';
    displayOnScreen();
    })

    return {hanger, gameBoard, displayOnScreen, printOnScreen, displayBoard, cells}


})();



/*
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
*/

