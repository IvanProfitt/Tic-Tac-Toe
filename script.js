const gameSpots = document.getElementsByClassName("spot");
let gameBoard = Array.from(gameSpots).map(spot => spot.querySelector("p"));
const winMsg=document.getElementById("winMessage");
let winner=false;
let end=false;
let draw=false;
let isBoardFull = true;
let difficulty=0;
let winningPlayer="";
let gameRestart=false;


function Player(){

        const spots = Array.from(gameSpots);
        const self = this;
    
        function spotClicked() {
            if(end===false){

                const paragraph = this.querySelector('p');
                if (paragraph.innerHTML === '') {
                    gameLoopObj.displayWinner();
                    paragraph.innerHTML = "x";
                    paragraph.classList.remove("empty");
                    paragraph.classList.add("full");
                    setTimeout(function() {
                        gameBot.processMove();
                      }, 500);

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
                paragraph.classList.remove("empty");
                paragraph.classList.add("full");
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

}


function GameLoop(gameBot,gamePlayer){
    this.checkEnd=function(){
            end = (this.checkWinner(gameBoard) || this.checkDraw(gameBoard));

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
                winner=true;
                return true;
            }
        }

    }

    this.displayWinner=function(){
        console.log("display winner " + winner + " " + winningPlayer);
        if(winner===true){
            winMsg.innerHTML=`${winningPlayer} Wins!`;
        }
        else if(draw===true){
            winMsg.innerHTML="Draw.";
        }


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
        draw=false;
        end=false;

    }

}


const gameBot = new Bot();
const gamePlayer = new Player();
const gameLoopObj= new GameLoop(gameBot,gamePlayer);