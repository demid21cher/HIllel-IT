class Slider {
  constructor(selector, config = {}) {
    this.slider = document.querySelector(selector);

    if (!this.slider) {
      throw new Error('Slider element not found');
    }

    this.slidesContainer = this.slider.querySelector('.slides');
    this.slides = Array.from(this.slider.querySelectorAll('.slide'));

    this.config = {
      autoPlay: true,
      interval: 2000,
      showDots: true,
      showControls: true,
      pauseOnHover: true,
      swipe: true,
      ...config,
    };

    this.current = 0;
    this.intervalId = null;
    this.isPlaying = false;

    this.startX = 0;
    this.endX = 0;

    this.controlsContainer = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.toggleBtn = null;

    this.dotsContainer = null;
    this.dots = [];

    this.init();
  }

  init() {
    if (this.config.showControls) {
      this.createControls();
    }

    if (this.config.showDots) {
      this.createDots();
    }

    this.showSlide(this.current);
    this.addEvents();

    if (this.config.autoPlay) {
      this.startAutoSlide();
    }
  }

  createControls() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'slider-controls';

    this.prevBtn = document.createElement('button');
    this.prevBtn.textContent = 'Prev';

    this.nextBtn = document.createElement('button');
    this.nextBtn.textContent = 'Next';

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.textContent = 'Pause';

    this.controlsContainer.append(this.prevBtn, this.nextBtn, this.toggleBtn);

    this.slider.appendChild(this.controlsContainer);
  }

  createDots() {
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.className = 'dots';

    this.slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';

      dot.addEventListener('click', () => {
        this.stopAutoSlide();
        this.goToSlide(index);
      });

      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    this.slider.appendChild(this.dotsContainer);
  }

  showSlide(index) {
    this.slides.forEach((slide) => {
      slide.classList.remove('active');
    });

    this.slides[index].classList.add('active');

    this.dots.forEach((dot) => {
      dot.classList.remove('active');
    });

    if (this.dots[index]) {
      this.dots[index].classList.add('active');
    }
  }

  goToSlide(index) {
    this.current = index;
    this.showSlide(this.current);
  }

  nextSlide() {
    this.current = (this.current + 1) % this.slides.length;
    this.showSlide(this.current);
  }

  prevSlide() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;

    this.showSlide(this.current);
  }

  startAutoSlide() {
    this.stopAutoSlide();

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.config.interval);

    this.isPlaying = true;

    if (this.toggleBtn) {
      this.toggleBtn.textContent = 'Pause';
    }
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);

    this.isPlaying = false;

    if (this.toggleBtn) {
      this.toggleBtn.textContent = 'Play';
    }
  }

  addEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.stopAutoSlide();
        this.prevSlide();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.stopAutoSlide();
        this.nextSlide();
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.stopAutoSlide();
        } else {
          this.startAutoSlide();
        }
      });
    }

    if (this.config.pauseOnHover) {
      this.slides.forEach((slide) => {
        slide.addEventListener('mouseenter', () => {
          if (this.isPlaying) {
            this.stopAutoSlide();
          }
        });

        slide.addEventListener('mouseleave', () => {
          if (this.config.autoPlay) {
            this.startAutoSlide();
          }
        });
      });
    }

    if (this.config.swipe) {
      this.addSwipeEvents();
    }
  }

  addSwipeEvents() {
    this.slidesContainer.addEventListener('touchstart', (event) => {
      this.startX = event.touches[0].clientX;
    });

    this.slidesContainer.addEventListener('touchend', (event) => {
      this.endX = event.changedTouches[0].clientX;
      this.handleSwipe();
    });

    this.slidesContainer.addEventListener('mousedown', (event) => {
      this.startX = event.clientX;
    });

    this.slidesContainer.addEventListener('mouseup', (event) => {
      this.endX = event.clientX;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const distance = this.endX - this.startX;

    if (Math.abs(distance) > 50) {
      this.stopAutoSlide();

      if (distance > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
  }
}

new Slider('.slider', {
  autoPlay: true,
  interval: 2500,
  showDots: true,
  showControls: true,
  pauseOnHover: true,
  swipe: true,
});
