// Minimalist deck navigation logic
class Deck {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.total = this.slides.length;
        this.current = 0;
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.counter = document.getElementById('slideCounter');
        this.progressFill = document.getElementById('progressFill');
        this.container = document.getElementById('slidesContainer');
        this.touchStartX = 0;
        this.touchStartY = 0;

        this.init();
    }

    init() {
        this.updateUI();
        this.prevBtn.addEventListener('click', () => this.go(this.current - 1));
        this.nextBtn.addEventListener('click', () => this.go(this.current + 1));
        document.addEventListener('keydown', (e) => this.keyNav(e));
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true});
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true});
    }

    keyNav(e) {
        if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
            e.preventDefault();
            this.go(this.current + 1);
        } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            this.go(this.current - 1);
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        const dx = e.changedTouches[0].clientX - this.touchStartX;
        const dy = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) this.go(this.current + 1);
            else this.go(this.current - 1);
        }
    }

    go(index) {
        if (index < 0 || index >= this.total || index === this.current) return;
        const direction = index > this.current ? 'next' : 'prev';
        // Remove active from current
        this.slides[this.current].classList.remove('active');
        if (direction === 'prev') this.slides[this.current].classList.add('prev');
        else this.slides[this.current].classList.remove('prev');

        this.current = index;
        // Add active to new slide
        this.slides[this.current].classList.add('active');
        this.updateUI();
    }

    updateUI() {
        // Counter
        this.counter.textContent = `${this.current + 1} / ${this.total}`;
        // Buttons
        this.prevBtn.disabled = this.current === 0;
        this.nextBtn.disabled = this.current === this.total - 1;
        // Progress
        this.progressFill.style.width = `${((this.current) / (this.total - 1)) * 100}%`;
    }
}

// Initialize when DOM ready
window.addEventListener('DOMContentLoaded', () => {
    new Deck();
});