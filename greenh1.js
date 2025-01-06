document.addEventListener("DOMContentLoaded",() =>{
    document.getElementById("green-h1").addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>{
            chrome.scripting.executeScript({
                target:{tabId: tabs[0].id},
                func : greenH1
            })
        }

        )
    }
)
}
)
 function greenH1(){
    console.log("hello")
    const h1s = document.querySelectorAll('h1');
    h1s.forEach(h1 =>{
        h1.style.color ='green';
    })
 }