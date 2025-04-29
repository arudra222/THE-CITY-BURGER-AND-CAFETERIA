/**
 * Testimonial Slider for The City Burger and Cafeteria
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize the slider
    function initSlider() {
        // Show only the active slide
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update the active dot
        updateDots();
        
        // Add event listeners
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Auto-advance slides every 5 seconds
        startAutoSlide();
    }
    
    // Show previous slide
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Show next slide
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Update the slider display
    function updateSlider() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        updateDots();
        
        // Reset auto-slide timer
        resetAutoSlide();
    }
    
    // Update the active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto-slide functionality
    let autoSlideTimer;
    
    function startAutoSlide() {
        autoSlideTimer = setInterval(showNextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }
    
    // Pause auto-slide when user interacts with the slider
    const sliderContainer = document.querySelector('.testimonial-slider');
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideTimer);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Initialize the slider
    initSlider();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only if we're on the testimonials page
        if (document.querySelector('.testimonials-section')) {
            if (e.key === 'ArrowLeft') {
                showPrevSlide();
            } else if (e.key === 'ArrowRight') {
                showNextSlide();
            }
        }
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            showNextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            showPrevSlide();
        }
    }
});
