document.getElementById("time-30min").addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { type: "greeting-30", data: "Bonjour depuis popup.js !" },
    (response) => {
      console.log("Réponse du background.js :", response.response);
      document.getElementById("response").innerText = response.response;
    }
  );
});
document.getElementById("time-60min").addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { type: "greeting-60", data: "Bonjour depuis popup.js !" },
    (response) => {
      console.log("Réponse du background.js :", response.response);
      document.getElementById("response").innerText = response.response;
    }
  );
});
chrome.storage.local.get(["key"]).then((result) => {
  alert(result.key);
});
