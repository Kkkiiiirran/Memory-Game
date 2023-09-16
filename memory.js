//defined a cardlist array that contains the names of the images

var cardlist =[
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardset; //this is the array that will contain the cardlist twice
var board = []; //this is the array that will contain the cards in the board
var rows = 4;
var cols = 5;

var firstSelection;
var secondSelection;

var timer = 60;
var score = 0;

var audio = new Audio();

window.onload = function(){
    shuffleCards(); //take the cardlist and add it to our card set but twice since we need pairs
    startGame(); //populate the cards in html
    timerCountdown();
    
}

function shuffleCards() {
    cardset = cardlist.concat(cardlist);
    
    for (let i = 0; i<cardset.length; i++){
        let j = Math.floor(Math.random() * cardset.length);

        //explain the code below in detail //
        let temp = cardset[i]; //temp is a temporary variable that holds the value of cardset[i]
        cardset[i] = cardset[j]; //cardset[i] is now equal to cardset[j]
        cardset[j] = temp;  //cardset[j] is now equal to temp which is the value of cardset[i]


    }
}

function startGame(){
    for(let r= 0;r< rows; r++) {
        let row = [];
        for(var c = 0; c< cols; c++) {
            let cardImg = cardset.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();  
            card.src = "Images/" + cardImg + ".jpg";  
            card.classList.add("card");
            card.addEventListener("click", clickedCard);
            document.getElementById("board").appendChild(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(flipCards, 1000)

}

function flipCards() {
    for(let r = 0; r<rows; r++) {
        for(let c = 0; c<cols; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "Images/back.jpg";
        }
    }
}

function clickedCard() {
    if (this.src.includes("back")) {
        audio.src = "flip.mp3";
        audio.play();
        if (!firstSelection) {
            firstSelection = this;
            
            let sourceCoords = firstSelection.id.split("-");
            let r = parseInt(sourceCoords[0]);
            let c = parseInt(sourceCoords[1]); //parseInt converts a string to an integer

            firstSelection.src = "Images/" + board[r][c] + ".jpg";
        }

        else if (!secondSelection && this != firstSelection) {
            secondSelection = this;
            
            let sourceCoords = secondSelection.id.split("-");
            let r = parseInt(sourceCoords[0]);
            let c = parseInt(sourceCoords[1]);

            secondSelection.src = "Images/" + board[r][c] + ".jpg";

            setTimeout(checkMatch, 1000);
        }

    }
}

function checkMatch() {

    if (firstSelection.src != secondSelection.src) {
        firstSelection.src = "Images/back.jpg";
        secondSelection.src = "Images/back.jpg";
        
    }

    else {
        //replace match audio in place of flip audio
        audio.src = "match.mp3";
        audio.play();
        
        score+= 10;
        document.getElementById("score").innerHTML = score;
    }

    checkVictory();
    firstSelection = null;
    secondSelection = null;
}

function timerCountdown() {
    setInterval (function() {
        if (timer > 0) {
            timer--;
            document.getElementById("timer").innerHTML = timer;
        }
        else if (timer == 0) {
            clearInterval(timer);
            var gameOver = new Audio("gameover.mp3");
            gameOver.play();
            document.querySelector("#board").innerHTML = "<h1>Game Over</h1>";
        }
        }, 1000);
    
}



function checkVictory() {
    if (score == 100 && timer > 0) {
        clearInterval(timer);
        var victory = new Audio("victory.mp3");
        victory.play();
        document.querySelector("#board").innerHTML = "<h1>You Win!</h1>";
    }
}


//where to put the check victory function? // answer // in the check match function //why //    //answer    // because the check match function is called after the second selection is made and the second selection is made after the first selection is made and the first selection is made after the first selection is made. //why // because the
//


