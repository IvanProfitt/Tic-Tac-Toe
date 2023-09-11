const gameSpots = document.getElementsByClassName("spot");

function gameBoard(){

}

function player(){

}

function gameLoop(){

}

function addX(){
    console.log("hi");
}

function addO(){
    let ranNum=Math.floor(Math.random() * 9);
    console.log(ranNum);

    gameSpots[ranNum].style.backgroundImage="url('images/alpha-o.svg')";
}



Array.from(gameSpots).forEach(function(spot) {
    spot.addEventListener("click", spotClicked);
});

function spotClicked() {
    this.style.backgroundImage = "url('images/alpha-x.svg')";
    addO();
}