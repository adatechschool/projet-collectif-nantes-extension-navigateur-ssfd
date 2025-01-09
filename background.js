
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "greeting-30") {
        console.log("Message reçu depuis popup.js :", message.data);
        // Créer une alarme pour 30 minutes
        chrome.alarms.create('pauseReminder-30', {
            delayInMinutes: 0.1
        });
        sendResponse({ response: "La pause est dans 30 minutes" });
    } else if (message.type === "greeting-60") {
        console.log("Message reçu depuis popup.js :", message.data);
        // Créer une alarme pour 60 minutes
        chrome.alarms.create('pauseReminder-60', {
            delayInMinutes: 60
        });
        sendResponse({ response: "La pause est dans 60 minutes" });
    }
});

// Gestionnaire d'événements pour les alarmes:creation d'une notification:
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pauseReminder-30') {
        chrome.notifications.create('pauseNotification-30', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Vous mértiez une petite pause ZEN 💆🏻',
            message: 'Il est temps de faire une pause de 5 minutes',
            priority: 2,
            requireInteraction: true,
            buttons: [
                { title: 'OK, je fais une pause' },
                { title: 'Reporter de 5 minutes' }
            ]
        });
    } else if (alarm.name === 'pauseReminder-60') {
        chrome.notifications.create('pauseNotification-60', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Vous mértiez une petite pause ZEN 💆🏻',
            message: 'Il est temps de faire une pause de 10 minutes',
            priority: 2,
            requireInteraction: true,
            buttons: [
                { title: 'OK, je fais une pause' },
                { title: 'Reporter de 5 minutes' }
            ]
        });
    }
});
// Gestionnaire pour les boutons des notifications
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (notificationId === 'pauseNotification-30' || notificationId === 'pauseNotification-60') {
        if (buttonIndex === 0) {
            console.log("L'utilisateur commence une pause !");
        } else if (buttonIndex === 1) {
            console.log("L'utilisateur reporte la pause de 5 minutes.");
            // Reprogrammer une alarme pour 5 minutes supplémentaires
            chrome.alarms.create('pauseReminder-5', {
                delayInMinutes: 0.1
            });
        }
    }
});

//alimentation du stockage locale
chrome.storage.local.set({ key: "Welcome!" }).then(() => {
    console.log("Value is set");
  });
  

chrome.action.openPopup()
