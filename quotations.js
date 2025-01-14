export { getAudioUrl };

const quotations = [
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

const moodArray = ["wellness", "relaxing"];
let moodStyle = moodArray[Math.floor(Math.random() * moodArray.length)];
console.log("moodstyle", moodStyle);

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


// Appliquer du style CSS pour positionner la citation
 // Créer un nouvel élément <div> pour afficher la citation
 const quotationDiv = document.createElement("div");
quotationDiv.style.position = "fixed"; // Pour le rendre visible au-dessus de la page
quotationDiv.style.top = "10%"; // Placer la citation dans le premier tiers du haut de la page
quotationDiv.style.left = "50%"; // Centrer horizontalement
quotationDiv.style.transform = "translateX(-50%)"; // Ajuster pour centrer parfaitement
quotationDiv.style.padding = "15px";
quotationDiv.style.backgroundColor = "#f0f0f0";
quotationDiv.style.borderRadius = "8px";
quotationDiv.style.fontSize = "30px";
quotationDiv.style.color = "black";
quotationDiv.style.textAlign = "center"; // Centrer le texte à l'intérieur du div
quotationDiv.style.zIndex = "9999"; // Assurer que le texte est au-dessus des autres éléments

//fonction pour afficher aléatoirement une citation

function getQuotation() {
  const randomQuotation = quotations[Math.floor(Math.random() * quotations.length)];
  
  // Ajouter la citation dans le div
  quotationDiv.innerText = randomQuotation;
}
// function getQuotation() {
//   try {
//     const randomQuotation = quotations[Math.floor(Math.random() * quotations.length)];
//     console.log(randomQuotation);
//     chrome.notifications.create({
//       type: "basic",
//       iconUrl: "icon.png",
//       title: "Citation pour votre pause",
//       message: `${randomQuotation}`,
//     });
//     return randomQuotation;
//   } catch (error) {
//     console.error("Erreur lors de la récupération de la citation:", error);
//     return "La pause est un moment précieux pour se ressourcer.";
//   }
// }
