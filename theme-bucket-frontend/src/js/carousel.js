const moveToSlide = (carouselItemsList, currentSlide, targetSlide) => {
    carouselItemsList.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('current-indicator')
    targetIndicator.classList.add('current-indicator')
}

const carouselItemsList = document.getElementById('carousel-items-list')
const carouselItems = Array.from(carouselItemsList.children)

const carouselIndicatorsContainer = document.getElementById('carousel-indicators-container')
const carouselIndicators = Array.from(carouselIndicatorsContainer.children)

const slideWidth = carouselItems[0].getBoundingClientRect().width

carouselItems.forEach((carouselItem, index) => {
    carouselItem.style.left = `${slideWidth * index}px`
})

carouselIndicatorsContainer.addEventListener('click', (event) => {
    clearInterval(carouselInterval)
    startCarousel(7000)
    const targetIndicator = event.target.closest('button')
    if (!targetIndicator) {
        return
    }
    const currentSlide = carouselItemsList.querySelector('.current-slide')
    const currentIndicator = carouselIndicatorsContainer.querySelector('.current-indicator')
    const targetIndex = carouselIndicators.findIndex((carouselIndicator) => carouselIndicator === targetIndicator)
    const targetSlide = carouselItems[targetIndex]
    moveToSlide(carouselItemsList, currentSlide, targetSlide)
    updateIndicators(currentIndicator, targetIndicator)
})

let carouselInterval

const startCarousel = (intervalTiming) => {
    carouselInterval = setInterval(() => {
        const currentSlide = carouselItemsList.querySelector('.current-slide')
        const nextSlide = currentSlide.nextElementSibling

        if (!nextSlide) {
            moveToSlide(carouselItemsList, currentSlide, carouselItems[0])
            updateIndicators(carouselIndicators[carouselIndicators.length - 1], carouselIndicators[0])
            return
        }

        const currentIndicator = carouselIndicatorsContainer.querySelector('.current-indicator')
        const nextIndicator = currentIndicator.nextElementSibling
        moveToSlide(carouselItemsList, currentSlide, nextSlide)
        updateIndicators(currentIndicator, nextIndicator)
    }, intervalTiming)
}

startCarousel(7000)
