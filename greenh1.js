document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("green-h1").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Premier appel pour greenH1
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: greenH1
        });
        
        // Deuxième appel pour redBorder
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: redBorder
        });
      });
    });
  });
  
  function greenH1() {
    console.log("hello");
    const h1s = document.querySelectorAll("h1");
    h1s.forEach((h1) => {
      h1.style.color = "green";
    });
  }
  
  function redBorder() {
    console.log("hello 2");
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.style.border = "solid 4px red";
    });
  }
  