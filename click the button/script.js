
// Variabili di gioco
let score = 0;
let gameActive = false;
let gameTime = 10; // Timer
let timerInterval;

// Funzione per avviare il gioco
function startGame() {
    score = 0;
    updateScore();
    gameActive = true;
    document.getElementById('clickButton').disabled = false; 
    timerInterval = setInterval(updateTimer, 1000); // Aggiorna il timer ogni secondo
    setTimeout(endGame, gameTime * 1000); // Termina il gioco
}

// Funzione per terminare il gioco
function endGame() {
    clearInterval(timerInterval); // Ferma il timer
    gameActive = false;
    document.getElementById('clickButton').disabled = true; // Disabilita il pulsante
    alert('Game Over! Your final score is ' + score);
}


// Funzione per aggiornare il timer
function updateTimer() {
    gameTime--;
    document.getElementById('timerDisplay').innerText = 'Time: ' + gameTime + 's';
}

// Funzione per aggiornare il punteggio
function updateScore() {
    document.getElementById('score').innerText = score;
}

// Gestore degli eventi per il clic sul pulsante
document.getElementById('clickButton').addEventListener('click', function () {
    if (gameActive) {
        score++;
        updateScore();
    }
});

// Avvia il gioco quando si carica la pagina
//window.onload = startGame;
