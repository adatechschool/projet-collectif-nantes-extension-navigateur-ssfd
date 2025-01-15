export { startDefilement }

//Fonction pour afficher les images
let images = [
    'photo/istockphoto-120529181-612x612.jpg',
    'photo/istockphoto-147694372-612x612.jpg',
    'photo/istockphoto-153262335-612x612.jpg',
    'photo/istockphoto-155142149-612x612.jpg',
    'photo/istockphoto-160932846-612x612.jpg',
    'photo/istockphoto-172953774-612x612.jpg',
    'photo/istockphoto-175494861-612x612.jpg',
    'photo/istockphoto-177816292-612x612.jpg',
    'photo/istockphoto-181888232-612x612.jpg',
    'photo/istockphoto-184955123-612x612.jpg',
    'photo/istockphoto-471314923-612x612.jpg',
    'photo/istockphoto-477375508-612x612.jpg',
    'photo/istockphoto-482394965-612x612.jpg',
    'photo/istockphoto-484589456-612x612.jpg',
    'photo/istockphoto-496989572-612x612.jpg',
    'photo/istockphoto-498210109-612x612.jpg',
    'photo/istockphoto-501328286-612x612.jpg',
    'photo/istockphoto-506600939-612x612.jpg',
    'photo/istockphoto-511860800-612x612.jpg',
    'photo/istockphoto-516715818-612x612.jpg',
    'photo/istockphoto-543560762-612x612.jpg',
    'photo/istockphoto-591435242-612x612.jpg',
    'photo/istockphoto-603992600-612x612.jpg',
    'photo/istockphoto-613146390-612x612 (1).jpg',
    'photo/istockphoto-623374096-612x612.jpg',
    'photo/istockphoto-637662846-612x612.jpg',
    'photo/istockphoto-669736944-612x612.jpg',
    'photo/istockphoto-819191072-612x612.jpg',
    'photo/istockphoto-824178342-612x612.jpg',
    'photo/istockphoto-824260926-612x612.jpg',
    'photo/istockphoto-825219688-612x612.jpg',
    'photo/istockphoto-834935900-612x612.jpg',
    'photo/istockphoto-878534294-612x612.jpg',
    'photo/istockphoto-918172734-612x612.jpg',
    'photo/istockphoto-1023136286-612x612.jpg',
    'photo/istockphoto-1098182022-612x612.jpg',
    'photo/istockphoto-1126205831-612x612.jpg',
    'photo/istockphoto-1146611596-612x612.jpg',
    'photo/istockphoto-1201143861-612x612.jpg',
    'photo/istockphoto-1206202068-612x612.jpg',
    'photo/istockphoto-1217444885-612x612.jpg',
    'photo/istockphoto-1218050016-612x612.jpg',
    'photo/istockphoto-1223163446-612x612.jpg',
    'photo/istockphoto-1274856809-612x612.jpg',
    'photo/istockphoto-1286552295-612x612.jpg',
    'photo/istockphoto-1296346667-612x612.jpg',
    'photo/istockphoto-1346147283-612x612.jpg',
    'photo/istockphoto-1423002945-612x612.jpg',
    'photo/istockphoto-1467946031-612x612.jpg',
    'photo/istockphoto-1519844010-612x612.jpg',
    'photo/istockphoto-1548352157-612x612.jpg',
    'photo/istockphoto-1553095143-612x612.jpg',
    'photo/istockphoto-2075746881-612x612.jpg',
    'photo/istockphoto-2159818844-612x612.jpg',
    'photo/istockphoto-2178238229-612x612.jpg'
  ];
  
  //fonction pour générer les images alétoirement
  function getRandomImgs() {
    return images[Math.floor(Math.random() * images.length)];
  }
  // fonction pour charger les image dans un nouvel onglet
  function loadImages() {
    chrome.tabs.create({
        url: getRandomImgs(),
        active: true
    });
  }
  
  // Fonction pour faire défiler les images
  function startDefilement() {
    // Affiche la première image dans un nouvel onglet
    chrome.tabs.create({ url: getRandomImgs() });
    
    // Change l'image toutes les 3 secondes
    const intervalId = setInterval(() => {
      chrome.tabs.update({ url: getRandomImgs() });
    }, 3000);
    
    // Arreter le défilement après 2 minutes
    setTimeout(() => clearInterval(intervalId), 6000);
  }
  
