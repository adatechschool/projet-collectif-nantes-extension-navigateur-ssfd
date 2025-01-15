export {getAudioUrl} 

//tableau de deux thèmes de l'API et aléatoire
  const moodArray = ["wellness", "relaxing"];
  let moodStyle = moodArray[Math.floor(Math.random() * moodArray.length)];
  console.log("moodstyle",moodStyle);
  
  //récupère la liste des pistes audio et faire un aléatoire dessus pour récupérer une piste
  async function getTrackIds() {
    try {
      const url = "https://api.jamendo.com/v3.0/tracks/"; 
      const params = new URLSearchParams({ //méthode pour générer une URL avec plusieurs paramètres
        client_id: "91856da6", //dps ligne 11 construction du endpoint
        format: "json", 
        tags: moodStyle,
      });
  
      const response = await fetch(`${url}?${params}`); //récupère et requête url construite au-dessus
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      const data = await response.json(); //reponse ok transformée en json
      const trackIds = data.results.map((track) => track.id); //récupère tous les id et les liste dans une variable qui est un tableau (trackIds)
      console.log("IDs des pistes trouvées :", trackIds);
      const trackId = parseInt(
        trackIds[Math.floor(Math.random() * trackIds.length)]
      );
      console.log("id random de piste :", trackId, typeof trackId);
      return trackId; //retourne un id aléatoire d'une des chansons du tableau trackIds
    } catch (error) {
      console.error("Erreur :", error);
    }
  }
  
  //fonction ouvre un onglet avec l'audio
  async function getAudioUrl() {
    let idTrack = await getTrackIds(); //rappelle la fonction asynchrone
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
      const audioUrl = data.results.map((track) => track.audio); //génère un teableau avec paramètres de chaque piste (id, photo etc.)
      console.log("url audio trouvée :", audioUrl);
      chrome.tabs.create({
        url: audioUrl[0],
      });
    } catch (error) {
      console.error("Erreur :", error);
    }
  }
  