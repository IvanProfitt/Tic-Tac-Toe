const gameSpots = document.getElementsByClassName("spot");
let gameBoard = Array.from(gameSpots).map(spot => spot.querySelector("p"));
const winMsg=document.getElementById("winMessage");
let winner=false;
let end=false;
let draw=false;
let winnerVal;
let isBoardFull = true;
let addingO=false;
let gameRestart=true;
let playerHasAddedX=false;
let difficulty=0;
let winningPlayer="";


function Player(){
    //Player presses a div and adds an X
    //Able to add X in the following conditions:
    //Game is running and the div is empty
    //Draw or win conditions have been met
    //And div is empty or full

        const spots = Array.from(gameSpots);
        const self = this;
    
        function spotClicked() {
            if(end===false){

                const paragraph = this.querySelector('p');
                if (paragraph.innerHTML === '') {
                    paragraph.innerHTML = "x";
                    gameBot.processMove();
                } else if (gameRestart === true) {
                }
            }
            else{
                gameLoopObj.resetGame();
            }
            }


        
            spots.forEach(function(spot) {
                spot.addEventListener("click", spotClicked);
            });
        
}





function Bot(){

    this.processMove=function(){
        if(difficulty===0){
            this.addOEasy();
        }
        else{
            this.addOhard();
        }

    }

    this.addOhard=function(){
        console.log("hard");

    }
    

    this.addOEasy=function(){
        let randNum = Math.floor(Math.random() * 9);
        const paragraph = gameSpots[randNum].querySelector('p');
        console.log(paragraph);
        
        gameLoopObj.checkEnd();
        if(end===false){
    
            if (paragraph.innerHTML !== '') {
                gameLoopObj.checkEnd();
                this.addOEasy();

            } else {
                paragraph.innerHTML = "o";
                gameLoopObj.checkEnd();
                if(end===true){
                    gameLoopObj.displayWinner();
                }
            }
        }
        else{
            gameLoopObj.displayWinner();
        }

    }
    //Bot adds one O as a consequence
    //Of player adding one X

}


function GameLoop(gameBot,gamePlayer){
    this.checkEnd=function(){
            end = (this.checkWinner(gameBoard) || this.checkDraw(gameBoard));
            console.log(this.checkWinner(gameBoard))

            console.log(end);
            if(end===undefined){
                end=false;
            }

            if(end===true){
            }
    }

    this.checkWinner=function(board){
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]              
        ];
    
        for (const line of lines) {
            const [a, b, c] = line;
    ``
            if (
                (board[a].innerHTML === board[b].innerHTML) &&
                (board[a].innerHTML === board[c].innerHTML) &&
                (board[a].innerHTML === 'x' || board[a].innerHTML === 'o')
            ) {
                winningPlayer = board[a].innerHTML;
                return true;
            }
        }

    }

    this.displayWinner=function(){
        const winMessage = document.getElementById("winMessage");
        winMessage.innerHTML=`${winningPlayer} Wins!`

    }

    this.checkDraw=function(board){
        isBoardFull= true;
        
                
        
        for (const spot of board) {
            if (!spot.innerHTML) {
                isBoardFull = false;
                break;
            }
        }

        if (isBoardFull && !end) {
            draw = true;
            end=true;
            return true;
        }

    }

    this.resetGame=function(){
        
        gameBoard.forEach(function (element) {
            if (element !== undefined) {
                element.innerHTML = "";
            }
        });


        winner=false;

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



    //Draw condition: One space left on the board
    //And X does not allow win condition to appear
    //Triggered when there are 8 spots filled on the board























const gameBot = new Bot();
const gamePlayer = new Player();
const gameLoopObj= new GameLoop(gameBot,gamePlayer);












/*function Player(){

    this.addX = function(callback) {
        console.log("your Turn");
        const spots = Array.from(gameSpots);
        const self = this;
    
        function spotClicked() {
            console.log("Called " + counter + " times")
            counter += 1;
            const paragraph = this.querySelector('p');
            if (paragraph.innerHTML === '') {
                paragraph.innerHTML = "x";
                callback();
            } else if (gameRestart === true) {
                paragraph.innerHTML = "x";
                callback();
            }
        }
    
        spots.forEach(function(spot) {
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
                        break;
                    }
                }
        
                if (isBoardFull && !winner) {
                    draw = true;
                }
            }
        
        

        this.newGame = function() {

            let hasPlayerAddedX = false;

            function gameLoop() {
                if (winner === false && draw === false && !hasPlayerAddedX) {
                    gamePlayer.addX(() => {
                        hasPlayerAddedX = true;
                        if (gameRestart === false) {
                            gameRestart = true;
                            restartGame();
                        }
                        gameBot.addOEasy();
                        gameLoopObj.checkDraw(gameBoard);
                        checkWin(gameBoard);
                        gameLoop();
                    });
                } else if (winner === true || draw === true) {
                    displayWinner();
                    restartVariables();
                    gameRestart = false;
                    hasPlayerAddedX = false;
                }
            }
            
            
            
            gameLoop();

            function displayWinner(){
                console.log("displayWinner");
                if(winner===true && winnerVal==='x'){
                    winMsg.innerHTML="You won!";
                }

                else if(draw===true){
                    winMsg.innerHTML="Draw";
                }
            }
            function restartGame(){
                console.log("game restarting");
            
                gameBoard.forEach(function (element) {
                    if (element !== undefined) {
                        element.innerHTML = "";
                    }
                });
            
                const spots = Array.from(gameSpots);
                spots.forEach(function (spot) {
                    spot.addEventListener("click", spotClicked);
                });
            }
            

            function restartVariables(){
                winner=false;
                draw=false;
                isBoardFull=false;

            }
        
    }
}







*/