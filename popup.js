let timer = document.getElementById("timer");
// let time = 2;
const MESSAGE = document.getElementById("zen-message");
// let intervalId = null;

// function startTimer() {
//     time = 2;
//     MESSAGE.innerHTML = "";
//     intervalId = setInterval(updateTimer, 1000);
// }

// function updateTimer() {
//     timer.innerHTML = "00:" + "0"+time;
//     time--;
    // if (time < 0) {
    //     displayZenMessage();
        
    //     setTimeout(() => {
    //         time = 2;
    //         MESSAGE.innerHTML = ""; 
    //     }, 1000);
    // }
// }

// function stopTimer() {
//     clearInterval(intervalId);
// }

function displayZenMessage() {    
    MESSAGE.innerHTML = "très doux, très gentil, avec des coeurs ! :)";
}
displayZenMessage()
// startTimer();
chrome.storage.local.get(["key"]).then((result) => {
    alert("Value is " + result.key);
  });