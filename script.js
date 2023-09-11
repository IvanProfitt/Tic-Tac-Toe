const gameSpots = document.getElementsByClassName("spot");
let gameBoard = Array.from(gameSpots).map(spot => spot.querySelector("p"));
let winner=false;
let winnerVal;

function Player(){

    this.addX = function(callback) {
        const spots = Array.from(gameSpots);
    
        function spotClicked() {
            const paragraph = this.querySelector('p');
            if (paragraph.innerHTML === '') {
                paragraph.innerHTML = "x";
                callback(); // Call the callback once the spot is clicked
            }
        }
    
        spots.forEach(function (spot) {
            spot.addEventListener("click", spotClicked);
        });
    }

}

function Bot(){

    this.addOEasy=function(){
        let randNum=Math.floor(Math.random() * 9);
        const paragraph = gameSpots[randNum].querySelector('p');

        if(paragraph.innerHTML!=''){
            console.log(paragraph.innerHTML);
            console.log(randNum);
            this.addOEasy();
        }
        else{
            paragraph.innerHTML="o";
        }
    }



}

function GameLoop(bot,player){
    this.bot=bot;
    this.player=player;



    function checkWin(board) {
        console.log("check winner called");
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];
    
        let isBoardFull = true; // Initialize as true
    
        for (const line of lines) {
            const [a, b, c] = line;
            if (
                board[a].innerHTML &&
                board[a].innerHTML === board[b].innerHTML &&
                board[a].innerHTML === board[c].innerHTML
            ) {
                console.log("winner");
                winner=true;
                winnerVal = board[a].innerHTML; // Update winner
                return; // Exit the loop, we found a winner
            }
        }
    
        for (const spot of board) {
            if (!spot.innerHTML) {
                isBoardFull = false; // If at least one spot is empty, the board is not full
                break;
            }
        }
    
        if (isBoardFull) {
            winner = "draw"; // If the board is full and there's no winner, it's a draw
        }
    }
    
    
    

    this.newGame = function() {

        function gameLoop() {

            if (winner === false) {
               
                gamePlayer.addX(() => {
                    gameBot.addOEasy();
                    checkWin(gameBoard);
                    gameLoop(); // Continue the game loop
                });
            }

            else{
                restartGame();
            }
        }
    
        gameLoop(); // Start the game loop


        function restartGame(){

            console.log("restart");
            gameBoard.forEach(function (element) {
                if (element !== undefined) {
                    element.innerHTML = "";
                    console.log("restart called");
                }

            });

        }
    }
    console.log("loop exited");
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

