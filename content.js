const images = document.querySelectorAll('img')

images.forEach ((image) => {
    image.src = chrome.runtime.getURL("photo/grumpyCat.png")
    image.alt = "photo de Grumpy Cat"
})