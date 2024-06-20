

const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const buttonWidth = 200; // Width of each button
const visibleButtons = 4; // Number of buttons visible in the container
const totalButtons = 15; // Total number of buttons
const maxIndex = totalButtons - visibleButtons;

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        sliderWrapper.style.transform = `translateX(-${currentIndex * buttonWidth}px)`;
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        sliderWrapper.style.transform = `translateX(-${currentIndex * buttonWidth}px)`;
    }
});
