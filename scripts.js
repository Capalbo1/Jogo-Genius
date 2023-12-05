
const colors = ["azul", "verde", "vermelho", "amarelo"];
const sequence = [];
const playerSequence = [];
let round = 0;

const startButton = document.getElementById("start-button");
const colorDivs = document.querySelectorAll(".color");
const result = document.getElementById("round")

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.disabled = true;
    startNewRound();
}

function startNewRound() {
   round++
    playerSequence.length = 0;
    addToSequence();
    playSequence();
    showpanel()
}

function addToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(function () {
        if (i < sequence.length) {
            flashColor(sequence[i]);
            i++;
        } else {
            clearInterval(interval);
            playerTurn();
        }
    }, 1000);
}

function flashColor(color) {
    const colorDiv = document.querySelector(`.${color}`);
    colorDiv.classList.add("sorteada");
    setTimeout(() => {
        colorDiv.classList.remove("sorteada");
    }, 1000);
}

function playerTurn() {
    for (const div of colorDivs) {
        div.addEventListener("click", handleColorClick);
    }
}

function handleColorClick(event) {
    const clickedColor = event.target.classList[1];
    playerSequence.push(clickedColor);
    flashColor(clickedColor);

    if (playerSequence.length === sequence.length) {
        if (checkSequences()) {
            setTimeout(startNewRound, 1000);
        } else {
            endGame();
        }
    }
}

function checkSequences() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function endGame() {
    alert("Game Over!");
    startButton.disabled = false;
    sequence.length = 0;
    playerSequence.length = 0;
    round=0
}

function showpanel(){
    result.textContent = `Rodada: ${round}`;
}




