import { watchZenVideo } from './Data/youtube-links.js';
import { getAudioUrl } from './Data/audios.js';
import { startDefilement } from './Data/images.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "greeting-30") {
    console.log("Message reçu depuis popup.js :", message.data);
    // Créer une alarme pour 30 minutes
    chrome.alarms.create("pauseReminder-30", {
      delayInMinutes: 0.05,
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
      title: "Vous méritez une petite pause ZEN 💆🏻",
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
      title: "Vous méritez une petite pause ZEN 💆🏻",
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

//fonction pour déclencher un nouveau chrono si l'utilisateur 
//choisit une pause dans 5min:
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

//alimentation du stockage local
chrome.storage.local
  .set({ key: "🧘🏻5 MIN TO RESET YOUR DAY IN A POSITIVE WAY🧘🏻" })
  .then(() => {
    console.log("Value is set");
  });

chrome.action.openPopup();



