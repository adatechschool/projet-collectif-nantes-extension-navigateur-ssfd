let time = 2;
let intervalId = null;

function startTimer() {
    time = 2;
    intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    time--;
    if (time < 0) {
        time = 2;
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

startTimer();