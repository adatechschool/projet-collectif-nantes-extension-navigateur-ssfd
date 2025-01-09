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
// Gestionnaire pour les boutons des notifications
chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    if (
      notificationId === "pauseNotification-30" ||
      notificationId === "pauseNotification-60"
    ) {
      if (buttonIndex === 0) {
        audioZen();
        console.log("L'utilisateur commence une pause !");
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

//alimentation du stockage locale
chrome.storage.local.set({ key: "Welcome!" }).then(() => {
  console.log("Value is set");
});

chrome.action.openPopup();



function audioZen() {
    console.log("audioZen function called");
    const JAMENDO_CLIENT_ID = "91856da6";
    const BASE_URL = "https://api.jamendo.com/v3.0";
  
    const fetchJamendoAPI = async (endpoint, params = {}) => {
      const queryParams = new URLSearchParams({
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        ...params,
      });
  
      try {
        const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching from Jamendo:", error);
        throw error;
      }
    };
  
    const getWellnessPlaylist = async (limit = 1) => {
      return await fetchJamendoAPI("/tracks/", {
        tags: "wellness relaxing meditation peaceful",
        limit: limit,
        include: "musicinfo",
        orderby: "popularity_total",
      });
    };
  
    const createAudioPlayer = (trackUrl) => {
      const audio = new Audio(trackUrl);
  
      return {
        play: () => {
          audio.play().then(() => {
            console.log("Audio playing");
          }).catch(error => {
            console.error("Error playing audio:", error);
          });
        },
        pause: () => audio.pause(),
        stop: () => {
          audio.pause();
          audio.currentTime = 0;
        },
        setVolume: (volume) => {
          audio.volume = Math.max(0, Math.min(1, volume));
        },
        onEnded: (callback) => {
          audio.addEventListener("ended", callback);
        },
      };
    };
  
    // Fetch a track and play it
    getWellnessPlaylist().then(data => {
      if (data.tracks && data.tracks.length > 0) {
        const trackUrl = data.tracks[0].audio;
        const player = createAudioPlayer(trackUrl);
        player.play();
      } else {
        console.log("No tracks found");
      }
    }).catch(error => {
      console.error("Error fetching wellness playlist:", error);
    });
  }