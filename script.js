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
        }
    };

    const playGame = function() {
        console.log(`${currentPlayer.name} is your turn`);
        gameBoard.printBoard();
    
    }

    const play = function(position) {
        if (gameBoard.board[position] === 'X' || gameBoard.board[position] === 'O') {
            console.log('This spot is already been taken');
        }
        else {
            gameBoard.board[position] = currentPlayer.mark;
            switchPlayer();
            playGame();
    
        }
    }


return { switchPlayer, makeMove, playGame, play  }
})();
gameLogic.playGame();


