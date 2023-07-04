// console.log(window.innerWidth, window.innerHeight)

const carousel = document.getElementById('carousel')
window.addEventListener('load', (event) => {
    carousel.style.height = `${carousel.getBoundingClientRect().width * 9 / 16}px`
})