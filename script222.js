const button = document.getElementById("got");
const info = document.getElementById("information");
const boxes = document.querySelectorAll(".box");
const statusCheck = document.querySelector("#status");
const resetButton = document.querySelector("#toReset");
const playing = document.querySelector("#playingagain");
const announce = document.querySelector(".win-announce");
let music = new Audio ("secondpage.mp3")
let audioTurn = new Audio ("click.mp3")
let gameover = new Audio ("thankyou.mp3")
const side = document.getElementById("side")
const gameContainer = document.getElementById("gameContainer")
var flag = false

button.onclick = () => {
    info.style.display = 'none';
    resetButton.style.display = "inline";
    playing.style.display = "none";
    }

const winPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// array with index starting from 0
var options = ["", "", "", "", "", "", "", "", "" ];
let currentTurn = "X";

// use of boolean operator to keep track if game is running
// it will be swtiched to true when we initialize the game
let runningGame = false;
let win = false


// use of startGame to take of the set up before we need to start 
// use of callback of boxClicked in addEventListener inside function and adding addEventListener to reset button and use of resetGame to invoke the resetGame function
startGame();
music.play();
function startGame () {
    boxes.forEach(box => box.addEventListener("click", boxClick));
    resetButton.addEventListener("click", resetGame);
    statusCheck.textContent = `${currentTurn}'s turn`;
    runningGame = true;
}

function boxClick () {
    const cellIndex = this.getAttribute("cellIndex");

// use of if to check the reuslt if there is no winner or the winner is declared with the help of the winner function
    if(options[cellIndex] != "" || !runningGame) {
        return;
    }else{
        updateCell(this, cellIndex);
        changeTurn();
        winner();
    }
    
}
// we set the sequel to the currentPlayer and we are basically updating the placeholders
function updateCell (box, index) {
    options[index] = currentTurn;
    box.textContent = currentTurn;
}

// use of ternary operator as if the current player is X, we will reassign it with 0, otherwise X
function changeTurn () {
    currentTurn = (currentTurn == "X")?"0":"X";
    statusCheck.textContent = `${currentTurn}'s turn`;
}

// we set the sequel to false, if somebody wins: flip the sequel to true
// use of for loop to iterate through all the conditions mentioned in the array (winPossiblities)
function winner () {
    let firstGame = false;

    // i is the current index taken
    for (let i = 0; i < winPossibilities.length; i++) {
        const possibility = winPossibilities[i];
        const boxA = options[possibility[0]];
        const boxB = options[possibility[1]];
        const boxC = options[possibility[2]];

        // to check any empty space and the game continues
        if(boxA == "" || boxB =="" || boxC == "") {
            continue;
        }

        // one player wins and we break the loop
        if(boxA == boxB && boxB == boxC && boxA == boxC) {
            firstGame = true;
            
            break;
        }
    }

    // to print the winner on the webpage
    if(firstGame) {
        statusCheck.innerHTML = 
        `<div class = 'win-announce'>
            ${(currentTurn == "X")?"0":"X"} wins!
        <div>`
        
        playing.style.display = "inline";
        resetButton.style.display = "none"
        console.log(resetButton.style.display)
        console.log(playing.style.display)
        gameContainer.style.filter = "blur(5px)"
        runningGame = false;
        win = true;
        gameover.play();
    }

    // if option does not include any spaces, then we update our statusCheck as draw and we stop the running
    else if (!options.includes("") && !firstGame) {
        statusCheck.innerHTML =`<div class = 'win-announce'>
            Game Draw!
        <div>`
        playing.style.display = "inline";
        resetButton.style.display = "none"
        console.log(resetButton.style.display)
        console.log(playing.style.display)
        gameContainer.style.filter = "blur(5px)"
        runningGame = false;
        win = true;
        gameover.play();
        runningGame = false;
    }
}

function resetGame () {
    currentTurn = "X";
    options = ["", "", "", "", "", "", "", "", "" ];
    statusCheck.textContent = `${currentTurn}'s turn`;
    boxes.forEach(box => box.textContent = "");
    runningGame = true;
}

function playagain(){
    currentTurn = "X";
    options = ["", "", "", "", "", "", "", "", "" ];
    statusCheck.textContent = `${currentTurn}'s turn`;
    boxes.forEach(box => box.textContent = "");
    runningGame = true;
}

playing.onclick = () =>{
    playagain()
    gameContainer.style.filter = "none"
    playing.style.display = 'none'
    resetButton.style.display = 'inline'
}

