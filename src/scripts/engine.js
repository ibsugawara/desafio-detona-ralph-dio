const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        playerLives: document.querySelector("#player-lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        lives: 3,
        gameOver: false
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        gameEnd();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
    return audio;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function gameEnd() {
    state.values.gameOver = true;
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)

    const gameOverSound = playSound("gameover");
    gameOverSound.onended = () => {
        alert("GAME OVER! O seu resultado foi: " + state.values.result);
        location.reload();
    }
}

function addListenerHitbox() {
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {

            if(state.values.gameOver == true) return;

            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else {
                playSound("fail")
                state.values.lives--;
                state.view.playerLives.textContent = state.values.lives;

                if(state.values.lives <= 0) {
                    gameEnd();
                }

            }
        });
    });
}

function main() {
    addListenerHitbox();
}

randomSquare()
main()