console.log("extension chrome prête à être alimentée");

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

const randomQuotation =
  quotations[Math.floor(Math.random() * quotations.length)];

// Créer un nouvel élément <div> pour afficher la citation
const quotationDiv = document.createElement("div");
quotationDiv.classList.add("quotation");
// Ajouter la citation dans le div
quotationDiv.innerText = randomQuotation;

// Ajouter le div au body de la page
document.body.appendChild(quotationDiv);
