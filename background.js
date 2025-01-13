chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "greeting-30") {
    console.log("Message reçu depuis popup.js :", message.data);
    // Créer une alarme pour 30 minutes
    chrome.alarms.create("pauseReminder-30", {
      delayInMinutes: 0.1,
    });
    sendResponse({ response: "La pause est dans 30 minutes" });
  } else if (message.type === "greeting-60") {
    console.log("Message reçu depuis popup.js :", message.data);
    // Créer une alarme pour 60 minutes
    chrome.alarms.create("pauseReminder-60", {
      delayInMinutes: 60,
    });
    sendResponse({ response: "La pause est dans 60 minutes" });
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
    "https://www.youtube.com/watch?v=FkcPe_BsX70&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=3",
    "https://www.youtube.com/watch?v=fZCUYYW3W8c&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=11",
    "https://www.youtube.com/watch?v=f3N2QrQMCsQ"
  ];
function getRandomUrl(){
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
      notificationId === "pauseNotification-60"||
      notificationId === "pauseNotification-5"
    ) {
        chrome.notifications.clear(notificationId);
      if (buttonIndex === 0) {
        console.log("L'utilisateur commence une pause !");
        watchZenVideo();
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
          { title: "Reporter de 5 minutes" }
        ],
        requireInteraction: true
      });
    };
});
//alimentation du stockage locale
chrome.storage.local.set({ key: "🧘🏻5 min to reset your day in a positive way🧘🏻" }).then(() => {
  console.log("Value is set");
});

chrome.action.openPopup();
