let time = 2;
let intervalId = null;

//alimentation du stockage locale
chrome.storage.local.set({ key: "Delphine" }).then(() => {
    console.log("Value is set");
  });
  

chrome.action.openPopup()
 
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