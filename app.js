let tiles = [
    {name: "audi",
    count: 2},
    {name: "subaru",
    count: 2},
    {name: "bmw",
    count: 2},
    {name: "kia",
    count: 2},
    {name: "opel",
    count: 2},
    {name: "volkswagen",
    count: 2},
    {name: "ford",
    count: 2},
    {name: "alfa-romeo",
    count: 2},
    {name: "chevrolet",
    count: 2},
    {name: "fiat",
    count: 2},
    {name: "hyundai",
    count: 2},
    {name: "honda",
    count: 2},
    {name: "volvo",
    count: 2},
    {name: "mitsubishi",
    count: 2},
    {name: "skoda",
    count: 2}
];


class Tile{
    constructor(name, count){
        this.name = name;
        this.count = count;
    }
}
console.log(tiles);
let gameSize = 0, score = 0, maxScore = 0;
let tilesSet = [];
let card = ['',''];
let interval;
let time, modeInfo;
document.getElementById('four').addEventListener('click', () => {console.log('4x4 clicked'); gameSize = 16; generateGame(gameSize);});
document.getElementById('five').addEventListener('click', () => {console.log('4x5 clicked'); gameSize = 20; generateGame(gameSize);});
document.getElementById('six').addEventListener('click', () => {console.log('5x6 clicked'); gameSize = 30; generateGame(gameSize);});

document.getElementById('btnStartAgain').addEventListener('click', startNewGame);
document.getElementById('endGame').style.display = 'none';

function startTimer(ms){
    let start = new Date();
    interval = setInterval(() => {
        let current = new Date();
        let count = +current - +start;
        let seconds = Math.floor((count /  1000)) % 60;
        let minutes = Math.floor((count / 60000)) % 60;
        time = convert(minutes) + ":" + convert(seconds);
        document.querySelector('.gameInfo').innerHTML = "Your time: " + time + " | SCORE: "+score+"/"+maxScore+" | "+ modeInfo;
    }, ms);
}

        

function convert(x){
    return x > 9 ? "" + x: "0" + x;
}





function generateGame(){
    console.log("function started");
    document.getElementById('newGame').style.display = 'none';
    let generatedTiles = 0, random, i = 0;
    while(1){
        console.log('iteration #' + i);
        random = Math.floor((gameSize/2) * Math.random());
        if(tiles[random].count > 0){
            tilesSet.push(new Tile(tiles[random].name, tiles[random].count));
            
            tiles[random].count--;
            generatedTiles++;
            console.log("Tiles generated: " + generatedTiles);
        }
        if(generatedTiles === gameSize){
            console.log(tilesSet);
            drawGame();
            return true;
        } 
        i++;
    }
    
    
}

function drawGame(){
    let game = document.querySelector('.game');
    let cssClass, freezeGame = 0;
    if(gameSize === 16) {
        cssClass = "four";
        modeInfo = 'Game mode: 4X4';
    }
    if(gameSize === 20) {
        cssClass = "five";
        modeInfo = 'Game mode: 4X5';
    }
    if(gameSize === 30) {
        cssClass = "six";
        modeInfo = 'Game mode: 5X6';
    }

    game.setAttribute("class", "game");

    game.classList.add(cssClass);
    maxScore = gameSize / 2;
    console.log("MAX SCORE: "+maxScore);
    for(let j = 0; j < tilesSet.length; j++){
        console.log(tilesSet[j].name);
        game.innerHTML += '<div class="grid-item-reverse" id="'+tilesSet[j].name+tilesSet[j].count+'"><img src="images/'+tilesSet[j].name+'.jpg"/></div>';
    }
    document.querySelectorAll('.grid-item-reverse').forEach(card => {
        card.addEventListener('click', revCard);
    });
    document.querySelector('.gameInfo').style.display = 'flex';
    startTimer(100);    //start timer
    
    function revCard(){
        
            if(!this.classList.contains("grid-item-found") && !this.classList.contains("grid-item")){
                if(this.classList.contains("grid-item-reverse")){
                    this.classList.add("grid-item");
                    this.classList.remove("grid-item-reverse");
                }
                if(card[0] === ''){
                    card[0] = this.id;
                    console.log("card one revealed: " + card[0]);
                }else if(card[1] === ''){
                    card[1] = this.id;        
                    console.log("card two revealed: " + card[1]);
                    compareCards(card[0], card[1]);
                    
                } 
            }
    
    }

    function compareCards(cardOne, cardTwo){
        let subOne, subTwo;
        subOne = cardOne.substring(0, cardOne.length - 1);
        subTwo = cardTwo.substring(0, cardTwo.length - 1);
        console.log("Comparing "+cardOne+" and "+cardTwo);
        if(subOne === subTwo) {
            hideCards(cardOne, cardTwo);
            console.log("Pair found!");
            
        } else {
            reverseCards(cardOne, cardTwo);
            console.log("sorry, that's not a pair!");
        }
        
    }
    
    function hideCards(cardOne, cardTwo){
        document.querySelectorAll('.grid-item-reverse').forEach(card => {
            card.removeEventListener('click', revCard);
        });
        setTimeout(() => {
        document.getElementById(cardOne).classList.add('grid-item-found'); 
        document.getElementById(cardTwo).classList.add('grid-item-found');
        console.log("card slots resetting...");
        console.log("Card ONE: "+cardOne+", card TWO: "+cardTwo);
        score++;
        console.log("ACTUAL SCORE: "+score+"MAX SCORE: "+maxScore);
        if(score === maxScore) endGame();
        card[0] = '';
        card[1] = '';
        document.querySelectorAll('.grid-item-reverse').forEach(card => {
            card.addEventListener('click', revCard);
        });
        }, 1000);
        
    }
    
    function reverseCards(cardOne, cardTwo){
        document.querySelectorAll('.grid-item-reverse').forEach(card => {
            card.removeEventListener('click', revCard);
        });
        setTimeout(() => {
            document.getElementById(cardOne).classList.add('grid-item-reverse');
            document.getElementById(cardTwo).classList.add('grid-item-reverse');
            document.getElementById(cardOne).classList.remove('grid-item');
            document.getElementById(cardTwo).classList.remove('grid-item');
            console.log("card slots resetting...");
            card[0] = '';
            card[1] = '';
            document.querySelectorAll('.grid-item-reverse').forEach(card => {
                card.addEventListener('click', revCard);
            });
        }, 1000);
        
    }

}

function endGame(){
    document.getElementById('time').innerHTML = time;
    document.getElementById('endGame').style.display = 'flex';
    document.querySelector('.gameInfo').style.display = 'none';
    clearInterval(interval);
}

function startNewGame(){
    time = "00:00";
    card = ['',''];
    gameSize = 0; 
    score = 0; 
    maxScore = 0;
    tilesSet = [];
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('newGame').style.display = 'flex';
    document.querySelector('.game').innerHTML = '';
    document.querySelector('.gameInfo').innerHTML = '';
    
    tiles.forEach(tile => tile.count = 2);
}
