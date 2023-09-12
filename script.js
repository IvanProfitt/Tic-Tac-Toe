const gameSpots = document.getElementsByClassName("spot");
let gameBoard = Array.from(gameSpots).map(spot => spot.querySelector("p"));
let winner=false;
let draw=false;
let winnerVal;
let isBoardFull = true;
let addingO=false;


function Player(){

    this.addX = function(callback) {
        const spots = Array.from(gameSpots);
    
        function spotClicked() {
            const paragraph = this.querySelector('p');
            if (paragraph.innerHTML === '') {
                paragraph.innerHTML = "x";
                callback();
            }
        }
    
        spots.forEach(function (spot) {
            spot.addEventListener("click", spotClicked);
        });
    }

}

function Bot(){

    this.addOEasy = function() {
        if (addingO || draw) {
            return; // Don't add "o" if already adding or if game is a draw
        }
    

        else{
        let randNum = Math.floor(Math.random() * 9);
        const paragraph = gameSpots[randNum].querySelector('p');
        gameLoopObj.checkDraw(gameBoard);
    
        if (paragraph.innerHTML !== '' && isBoardFull===false) {
            this.addOEasy();
        } else {
            paragraph.innerHTML = "o";
        }
    }
    }
    



}

function GameLoop(bot,player){
    this.bot=bot;
    this.player=player;


    this.checkWin = function(board) {

        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]              
        ];

        for (const line of lines) {
            const [a, b, c] = line;

            if (
                board[a] &&
                board[b] &&
                board[c] &&
                board[a].innerHTML &&
                (board[a].innerHTML === board[b].innerHTML) &&
                (board[a].innerHTML === board[c].innerHTML) &&
                (board[a].innerHTML === 'x' || board[a].innerHTML === 'o')
            ) {
                winner = true;
                winnerVal = board[a].innerHTML;
                return;
            }
        }
    }
    
    function checkWin(board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]              
        ];
    
        for (const line of lines) {
            const [a, b, c] = line;
    
            if (
                board[a] &&
                board[b] &&
                board[c] &&
                board[a].innerHTML &&
                (board[a].innerHTML === board[b].innerHTML) &&
                (board[a].innerHTML === board[c].innerHTML) &&
                (board[a].innerHTML === 'x' || board[a].innerHTML === 'o')
            ) {
                winner = true;
                winnerVal = board[a].innerHTML;
                return;
            }
        }
    }

            this.checkDraw = function(board) {
                isBoardFull= true;
                
        
                for (const spot of board) {
                    if (!spot.innerHTML) {
                        isBoardFull = false;
                        console.log("DRAW2");
                        break;
                    }
                }
        
                if (isBoardFull && !winner) {
                    draw = true;
                    console.log("DRAW");
                }
            }
        
        

        this.newGame = function() {

            function gameLoop() {
                if (winner === false && draw === false) {
                    gamePlayer.addX(() => {
                        gameBot.addOEasy();
                        gameLoopObj.checkDraw(gameBoard);
                        checkWin(gameBoard);
                        gameLoop();
                    });
                }
                else{
                    displayWinner();
                    restartGame();
                    gameLoop();
                }
                
            
        }
            
            gameLoop();

            function displayWinner(){
                console.log("sdkjgasldkjf");
                const winMsg=document.getElementById("winMessage");
                if(winner===true && winnerVal==='x'){
                    winMsg.innerHTML="You won!";
                }

                else if(draw===true){
                    winMsg.innerHTML="Draw";
                }
            }
            function restartGame(){

                gameBoard.forEach(function (element) {
                    if (element !== undefined) {
                        element.innerHTML = "";
                    }
                    console.log("draw " + draw);
                    winner=false;
                    draw=false;
                    isBoardFull==false;

                });

            }
        
    }
}




    //Running While win condition isn't met
    //While loop of player choosing an option, checking win condition
    //bot choosing an option, checking win condition
    //Continously checking that all spaces are not filled
    //Reset the board when these conditions aren't met


    //win conditions:
    //[0,1,2],[3,4,5],[6,7,8]
    //[0,3,6],[1,4,7],[2,5,8]
    //[0,4,8],[2,4,6] are equal.



const gameBot = new Bot();
const gamePlayer = new Player();
const gameLoopObj= new GameLoop(gameBot,gamePlayer);
gameLoopObj.newGame();

