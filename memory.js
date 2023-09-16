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

var cardset;
var board = [];
var rows = 4;
var cols = 5;

window.onload = function(){
    shuffleCards(); //take the cardlist and add it to our card set but twice since we need pairs
    startGame(); //populate the cards in html
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
            document.getElementById("board").appendChild(card);
        }
        board.push(row);
    }

    console.log(board);
}

