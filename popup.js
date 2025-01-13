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

//________________________________
const imageContainer = document.getElementById('image-container');

// Liste d'URLs d'images 
let images = [
  'istockphoto-120529181-612x612.jpg',
  'istockphoto-147694372-612x612.jpg',
  'istockphoto-153262335-612x612.jpg',
  'istockphoto-155142149-612x612.jpg',
  'istockphoto-160932846-612x612.jpg',
  'istockphoto-172953774-612x612.jpg',
  'istockphoto-175494861-612x612.jpg',
  'istockphoto-177816292-612x612.jpg',
  'istockphoto-181888232-612x612.jpg',
  'istockphoto-184955123-612x612.jpg',
  'istockphoto-471314923-612x612.jpg',
  'istockphoto-477375508-612x612.jpg',
  'istockphoto-482394965-612x612.jpg',
  'istockphoto-484589456-612x612.jpg',
  'istockphoto-496989572-612x612.jpg',
  'istockphoto-498210109-612x612.jpg',
  'istockphoto-501328286-612x612.jpg',
  'istockphoto-506600939-612x612.jpg',
  'istockphoto-511860800-612x612.jpg',
  'istockphoto-516715818-612x612.jpg',
  'istockphoto-543560762-612x612.jpg',
  'istockphoto-591435242-612x612.jpg',
  'istockphoto-603992600-612x612.jpg',
  'istockphoto-613146390-612x612 (1).jpg',
  'istockphoto-623374096-612x612.jpg',
  'istockphoto-637662846-612x612.jpg',
  'istockphoto-669736944-612x612.jpg',
  'istockphoto-819191072-612x612.jpg',
  'istockphoto-824178342-612x612.jpg',
  'istockphoto-824260926-612x612.jpg',
  'istockphoto-825219688-612x612.jpg',
  'istockphoto-834935900-612x612.jpg',
  'istockphoto-878534294-612x612.jpg',
  'istockphoto-918172734-612x612.jpg',
  'istockphoto-1023136286-612x612.jpg',
  'istockphoto-1098182022-612x612.jpg',
  'istockphoto-1126205831-612x612.jpg',
  'istockphoto-1146611596-612x612.jpg',
  'istockphoto-1201143861-612x612.jpg',
  'istockphoto-1206202068-612x612.jpg',
  'istockphoto-1217444885-612x612.jpg',
  'istockphoto-1218050016-612x612.jpg',
  'istockphoto-1223163446-612x612.jpg',
  'istockphoto-1274856809-612x612.jpg',
  'istockphoto-1286552295-612x612.jpg',
  'istockphoto-1296346667-612x612.jpg',
  'istockphoto-1346147283-612x612.jpg',
  'istockphoto-1423002945-612x612.jpg',
  'istockphoto-1467946031-612x612.jpg',
  'istockphoto-1519844010-612x612.jpg',
  'istockphoto-1548352157-612x612.jpg',
  'istockphoto-1553095143-612x612.jpg',
  'istockphoto-2075746881-612x612.jpg',
  'istockphoto-2159818844-612x612.jpg',
  'istockphoto-2178238229-612x612.jpg'

];

// Fonction pour charger les images dans le conteneur  
function loadImages() {
    imageContainer.innerHTML = ''; // Videz le conteneur 
    let currentImageIndex = 0; // index de l'image actuelle
    const totalImages =images.length; //nombre total d'image

    //fonction pour afficher l'image
    function showImage() {  
      // Vérifier si l'index actuel est en dehors des limites  
      if (currentImageIndex >= totalImages) {
          console.log("La Pause est fini"); // Message dans la console  
          return; // Arrête la fonction si toutes les images ont été montrées  
      }
      const img = document.createElement('img');
      img.src = images[currentImageIndex];
      img.className = 'image'; // Assurez-vous que la classe 'image' a les styles CSS pour la transition  
      imageContainer.appendChild(img);

      // Apparition de l'image  
      //setTimeout(() => {
          img.classList.add('visible'); // Ajoute la classe visible pour montrer l'image  
     // }, 100); // Petit délai avant d'ajouter la classe visible

      // Disparition de l'image après un délai  
      setTimeout(() => {
          img.classList.remove('visible'); // Enlève la classe visible pour cacher l'image  
          setTimeout(() => {
              imageContainer.removeChild(img); // Supprime l'image du conteneur  
              currentImageIndex ++; // Passe à l'image suivante  
              showImage(); // Appelle récursivement pour afficher la prochaine image  
          }, 1000); // Délai avant de supprimer l'image  
      }, 3000); // Durée pendant laquelle l'image est visible  
  }

  showImage(); // Démarre le défilement des images  
}
    


// Écouter les messages du background  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startImageSlideshow") {
        loadImages(); // Appeler la fonction pour charger les images  
    }
});
//_______________________