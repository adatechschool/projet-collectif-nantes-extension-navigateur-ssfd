chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "greeting-30") {
    console.log("Message reçu depuis popup.js :", message.data);
    // Créer une alarme pour 30 minutes
    chrome.alarms.create("pauseReminder-30", {
      delayInMinutes: 0.1,
    });
    sendResponse({ response: "💆🏻Pause dans 30min💆🏻" });
  } else if (message.type === "greeting-60") {
    console.log("Message reçu depuis popup.js :", message.data);
    // Créer une alarme pour 60 minutes
    chrome.alarms.create("pauseReminder-60", {
      delayInMinutes: 60,
    });
    sendResponse({ response: "💆🏻Pause dans 60min💆🏻" });
  }
});

// Gestionnaire d'événements pour les alarmes:creation d'une notification:
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pauseReminder-30") {
    chrome.notifications.create("pauseNotification-30", {
      type: "basic",
      iconUrl: "icon.png",
      title: "Vous mértiez une petite pause ZEN 💆🏻",
      message: "Il est temps de faire une pause de 5 minutes",
      priority: 2,
      requireInteraction: true,
      buttons: [
        { title: "OK, je fais une pause" },
        { title: "Reporter de 5 minutes" },
      ],
    });
  } else if (alarm.name === "pauseReminder-60") {
    chrome.notifications.create("pauseNotification-60", {
      type: "basic",
      iconUrl: "icon.png",
      title: "Vous mértiez une petite pause ZEN 💆🏻",
      message: "Il est temps de faire une pause de 10 minutes",
      priority: 2,
      requireInteraction: true,
      buttons: [
        { title: "OK, je fais une pause" },
        { title: "Reporter de 5 minutes" },
      ],
    });
  }
});
//fonction pour généner une vidéo aléatoire:
const urls = [
  "https://www.youtube.com/watch?v=jCjpY0-7Rs0",
  "https://www.youtube.com/watch?v=mIeUmvy2b-k",
  "https://www.youtube.com/watch?v=ssss7V1_eyA",
  "https://www.youtube.com/watch?v=inpok4MKVLM",
  "https://www.youtube.com/watch?v=f3N2QrQMCsQ",
  "https://www.youtube.com/watch?v=FkcPe_BsX70&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=3",
  "https://www.youtube.com/watch?v=fZCUYYW3W8c&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=11",
];
function getRandomUrl() {
  return urls[Math.floor(Math.random() * urls.length)];
}
// fonction qui crée un nouvel onglet avec une vidéo aléatoire
function watchZenVideo() {
  chrome.tabs.create({
    url: getRandomUrl(),
    active: true, // L'onglet sera actif (au premier plan)
  });
}

// Gestionnaire pour les boutons des notifications
chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    console.log("entrée dans le gestionnaire");
    if (
      notificationId === "pauseNotification-30" ||
      notificationId === "pauseNotification-60" ||
      notificationId === "pauseNotification-5"
    ) {
      chrome.notifications.clear(notificationId);
      if (buttonIndex === 0) {
        console.log("L'utilisateur commence une pause !");
        //fonction aleatoire à déclencher;
        const randomZen = [watchZenVideo, getAudioUrl,startDefilement];
        const indexRandom = Math.floor(Math.random() * randomZen.length);
        const randomResult = randomZen[indexRandom]();
        return randomResult
      } else if (buttonIndex === 1) {
        console.log("L'utilisateur reporte la pause de 5 minutes.");
        // Reprogrammer une alarme pour 5 minutes supplémentaires
        chrome.alarms.create("pauseReminder-5", {
          delayInMinutes: 0.1,
        });
      }
    }
  }
);
//fonction pour déclencher un nouveau chrono si l'utilisateur choisis une pause dans 5min:
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pauseReminder-5") {
    chrome.notifications.create("pauseNotification-5", {
      type: "basic",
      iconUrl: "icon.png",
      title: "RAPPEL DE PAUSE",
      message: "Il est temps de prendre votre pause !",
      buttons: [
        { title: "Prendre la pause" },
        { title: "Reporter de 5 minutes" },
      ],
      requireInteraction: true,
    });
  }
});
//alimentation du stockage locale
chrome.storage.local
  .set({ key: "🧘🏻5 MIN TO RESET YOUR DAY IN A POSITIVE WAY🧘🏻" })
  .then(() => {
    console.log("Value is set");
  });

chrome.action.openPopup();

const moodArray = ["wellness", "relaxing"];
let moodStyle = moodArray[Math.floor(Math.random() * moodArray.length)];
console.log("moodstyle",moodStyle);

async function getTrackIds() {
  try {
    const url = "https://api.jamendo.com/v3.0/tracks/";
    const params = new URLSearchParams({
      client_id: "91856da6",
      format: "json",
      tags: moodStyle,
    });

    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    const trackIds = data.results.map((track) => track.id);
    console.log("IDs des pistes trouvées :", trackIds);
    const trackId = parseInt(
      trackIds[Math.floor(Math.random() * trackIds.length)]
    );
    console.log("id random de piste :", trackId, typeof trackId);
    return trackId;
  } catch (error) {
    console.error("Erreur :", error);
  }
}

async function getAudioUrl() {
  let idTrack = await getTrackIds();
  console.log(idTrack);
  try {
    const url = "https://api.jamendo.com/v3.0/tracks/";
    const params = new URLSearchParams({
      client_id: "91856da6",
      format: "json",
      id: idTrack,
    });

    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    const audioUrl = data.results.map((track) => track.audio);
    console.log("url audio trouvée :", audioUrl);
    getQuotation();
    chrome.tabs.create({
      url: audioUrl[0],
    });
  } catch (error) {
    console.error("Erreur :", error);
  }
}

const quotation = [
  "La pause est un moment précieux pour se ressourcer.",
  "Prendre soin de soi n'est pas du temps perdu.",
  "Un esprit reposé est un esprit plus efficace.",
  "Respire profondément et profite de ce moment.",
  "Chaque pause est une opportunité de renouveau.",
  "Un moment de calme est un moment de clarté.",
  "Écoute le silence, il a tant à t'apprendre.",
  "Le repos n'est pas une faiblesse, c'est une force.",
  "Prends le temps de te reconnecter à toi-même.",
  "La productivité naît du bon équilibre entre effort et repos.",
  "Ferme les yeux, respire, et recentre-toi.",
  "Une pause bien méritée permet d'aller plus loin.",
  "Le calme est la clé d'un esprit clair.",
  "Accorde-toi ce moment de tranquillité.",
  "La qualité prime sur la quantité, prends le temps de te reposer.",
  "Chaque respiration est une nouvelle opportunité de se recentrer.",
  "Un esprit apaisé est un esprit créatif.",
  "Le bien-être se cultive une pause à la fois.",
  "Prends soin de ton corps, c'est le seul endroit où tu dois vivre.",
  "La pause est le meilleur carburant de la productivité.",
  "Dans le calme réside la force.",
  "Un moment pour soi est un cadeau pour tous.",
  "La sérénité commence par une simple respiration.",
  "Ralentir n'est pas reculer, c'est prendre de l'élan.",
  "Le repos d'aujourd'hui fait la force de demain.",
  "Méditer cinq minutes vaut mieux que s'agiter une heure.",
  "Ton bien-être est une priorité, pas une option.",
  "Le calme est le meilleur des conseillers.",
  "Chaque pause est une victoire sur le stress.",
  "La patience est une forme de sagesse.",
];
function getQuotation() {
  try {
    const randomQuotation =
      quotation[Math.floor(Math.random() * quotation.length)];
    console.log(randomQuotation);
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Citation pour votre pause",
      message: `${randomQuotation}`,
    });
    return randomQuotation;
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation:", error);
    return "La pause est un moment précieux pour se ressourcer.";
  }
}

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
  setTimeout(() => clearInterval(intervalId), 120000);
}
