const scoreElement = document.getElementById('score');
const options = document.querySelectorAll('.option');
const hexCodeElement = document.getElementById('hex-code');
const newColorButton = document.getElementById('new-color');
const messageElement = document.getElementById('message');
const maxScoreElement = document.getElementById('max-score');


let score = 0;
let maxScore = 0;

function generateRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function updateColorOptions(targetHex) {
    options.forEach((option, index) => {
        let randomHex = generateRandomHexColor();

        if (index === 0) {
            randomHex = targetHex;
        }


        option.style.backgroundColor = randomHex;
        option.dataset.hex = randomHex;
    });
}

function handleGuess(event) {
    const selectedHex = event.target.dataset.hex;
    const targetHex = hexCodeElement.textContent.trim(); 


    if (selectedHex === targetHex) {
        score++;
        messageElement.textContent = 'Correct!';
        messageElement.style.color = 'green';
        hexCodeElement.textContent = generateRandomHexColor();


        if (score > maxScore) {
            maxScore = score;
            localStorage.setItem('maxScore', maxScore);
        }
    } else {
        messageElement.textContent = 'Incorrect!';
        messageElement.style.color = 'red';
        hexCodeElement.textContent = generateRandomHexColor();
    }


    scoreElement.textContent = `Score: ${score}/${maxScore}`;
    updateColorOptions(targetHex); 
}

function newGame() {
    let targetHex = generateRandomHexColor();
    hexCodeElement.textContent = targetHex;
    hexCodeElement.style.color = 'black'; 
    updateColorOptions(targetHex);
    messageElement.textContent = '';
    messageElement.style.color = 'black';
}

if (localStorage.getItem('maxScore')) {
    maxScore = parseInt(localStorage.getItem('maxScore'));
    maxScoreElement.textContent = `Max Score: ${maxScore}`;
} else {
    maxScoreElement.textContent = 'Max Score: 0';
}

options.forEach(option => {
    option.addEventListener('click', handleGuess);
});


newColorButton.addEventListener('click', newGame);

newGame();