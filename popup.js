//ecouteur d'evenement sur le bouton 30 min
document.getElementById("time-30min").addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { type: "greeting-30", data: "Bonjour depuis popup.js !" }, //au clic envoi d'un mess à background
    (response) => {
      console.log("Réponse du background.js :", response.response); 
      document.getElementById("response").innerText = response.response; //affiche message à l'utilisateur (valeur de la clé response)
    }
  );
});

//ecouteur d'evenement sur le bouton 60 min
document.getElementById("time-60min").addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { type: "greeting-60", data: "Bonjour depuis popup.js !" },  //au clic envoi d'un mess à background
    (response) => {
      console.log("Réponse du background.js :", response.response); 
      document.getElementById("response").innerText = response.response; //affiche message à l'utilisateur (valeur de la clé response)
    }
  );
});

//récupérer message stocké dans stockage local du navigateur (via background.js)
chrome.storage.local.get(["key"]).then((result) => {
  alert(result.key);
});
