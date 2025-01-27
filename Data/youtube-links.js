export {watchZenVideo}

//création tableau d'url youtube
const youtubeUrls = [
    "https://www.youtube.com/watch?v=jCjpY0-7Rs0",
    "https://www.youtube.com/watch?v=mIeUmvy2b-k",
    "https://www.youtube.com/watch?v=ssss7V1_eyA",
    "https://www.youtube.com/watch?v=inpok4MKVLM",
    "https://www.youtube.com/watch?v=f3N2QrQMCsQ",
    "https://www.youtube.com/watch?v=FkcPe_BsX70&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=3",
    "https://www.youtube.com/watch?v=fZCUYYW3W8c&list=PL8qGgKC5WkTQsa-dTqRY6-EMJkdUNxieN&index=11"
  ];

//fonction pour généner une vidéo aléatoire:
  function getRandomUrl() {
    return youtubeUrls[Math.floor(Math.random() * youtubeUrls.length)];
  }
  
  // fonction qui crée un nouvel onglet avec une vidéo aléatoire
  function watchZenVideo() {
    chrome.tabs.create({
      url: getRandomUrl(),
      active: true, // L'onglet sera actif (au premier plan)
    });
  }