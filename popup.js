let timer = document.getElementById("timer");
let time = 10;

function startTimer() {
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer.innerHTML = "00:" + time;
    time--;

    if (time < 0) {
        time = 10;
        stopTimer();
    }

function stopTimer() {
    clearInterval(timer);
}
}
startTimer();