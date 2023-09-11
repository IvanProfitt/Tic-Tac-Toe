function gameBoard(){

}

function player(){

}

function gameLoop(){

}



const gameSpots = document.getElementsByClassName("spot");

Array.from(gameSpots).forEach(function(spot) {
    spot.addEventListener("click", spotClicked);
});

function spotClicked() {
    this.style.backgroundColor = "blue";
}
