const gameSpots = document.getElementsByClassName("spot");
let gameBoard = Array.from(gameSpots).map(spot => spot.querySelector("p"));

function player(){

    //One player needed
    //

}

function bot(){
    //One bot needed



}

function gameLoop(){


    //Running While win condition isn't met
    //While loop of player choosing an option, checking win condition
    //bot choosing an option, checking win condition
    //Continously checking that all spaces are not filled
    //Reset the board when these conditions aren't met

}

function addX(){
    console.log("hi");
}

function addO(){
    let randNum=Math.floor(Math.random() * 9);
    const paragraph = gameSpots[randNum].querySelector('p');






    if(paragraph.innerHTML!=''){
        console.log(paragraph.innerHTML);
        console.log(randNum);
        addO();


    }
    else{
        paragraph.innerHTML="o";
    }
}



Array.from(gameSpots).forEach(function(spot) {
    spot.addEventListener("click", spotClicked);
});

function spotClicked() {
    const paragraph = this.querySelector('p');
    if(paragraph.innerHTML===''){
    paragraph.innerHTML="x";
    addO();
    }
}