const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const toggleBtn = document.getElementById('toggle');
const dotsContainer = document.querySelector('.dots');
const slider = document.querySelector('.slides');

let current = 0;
let interval = null;
let isPlaying = true;
let startX = 0;
let endX = 0;

console.log(slides);

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    stopAutoSlide();
    toggleBtn.textContent = 'Play';
    goToSlide(i);
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function goToSlide(index) {
  current = index;
  showSlide(current);
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 2000);
  isPlaying = true;
}

function stopAutoSlide() {
  clearInterval(interval);
  isPlaying = false;
}

nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  toggleBtn.textContent = 'Play';
  nextSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  toggleBtn.textContent = 'Play';
  prevSlide();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    stopAutoSlide();
    toggleBtn.textContent = 'Play';
    prevSlide();
  } else if (event.key === 'ArrowRight') {
    stopAutoSlide();
    toggleBtn.textContent = 'Play';
    nextSlide();
  }
});

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    stopAutoSlide();
    toggleBtn.textContent = 'Play';
  } else {
    startAutoSlide();
    toggleBtn.textContent = 'Pause';
  }
});

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      stopAutoSlide();
      toggleBtn.textContent = 'Play';
      prevSlide();
    } else {
      stopAutoSlide();
      toggleBtn.textContent = 'Play';
      nextSlide();
    }
  }
}

startAutoSlide();
