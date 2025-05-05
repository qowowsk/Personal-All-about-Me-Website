let carouselData = [];
let currentIndex = 0;

async function loadCarouselData() {
    try {
        const res = await fetch('images.json');
        if (!res.ok) throw new Error('Failed to load images.json');
        const data = await res.json();
        if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
            throw new Error('No images found in JSON.');
        }
        carouselData = data.images;
        showCarouselItem(currentIndex);
        createDots();
    } catch (error) {
        console.error('Error loading carousel data:', error);
        document.getElementById('carousel-description').textContent = 'Unable to load carousel images.';
    }
}

function showCarouselItem(index) {
    const item = carouselData[index];
    const imageEl = document.getElementById('carousel-image');
    const descEl = document.getElementById('carousel-description');
    if (item && imageEl && descEl) {
        imageEl.src = item.image;
        descEl.textContent = item.description;
        updateDots(index);
    }
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
    if (!dotsContainer) return;
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
    updateDots(currentIndex);
}

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextItem);
        prevBtn.addEventListener('click', prevItem);
    }
    loadCarouselData();
});
