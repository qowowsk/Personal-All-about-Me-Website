let carouselData = [];
let currentIndex = 0;

async function loadCarouselData() {
    const res = await fetch('images.json');
    const data = await res.json();
    carouselData = data.images;
    showCarouselItem(currentIndex);
    createDots();
}

function showCarouselItem(index) {
    const item = carouselData[index];
    document.getElementById('carousel-image').src = item.image;
    document.getElementById('carousel-description').textContent = item.description;
    updateDots(index);
}

function nextItem() {
    currentIndex = (currentIndex + 1) % carouselData.length;
    showCarouselItem(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    showCarouselItem(currentIndex);
}

function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = '';
    carouselData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
            currentIndex = index;
            showCarouselItem(index);
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

document.getElementById('next').addEventListener('click', nextItem);
document.getElementById('prev').addEventListener('click', prevItem);

loadCarouselData();
