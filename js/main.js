/**
 * Main JavaScript for The City Burger and Cafeteria
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Reset hamburger animation
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('animate'));
            }
        });
    });
    
    // Form submission handler
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form submission feedback
            alert('Thank you for your feedback! We appreciate your input.');
            feedbackForm.reset();
            
            // In a real application, you would send this data to a server
            console.log({
                name: name,
                email: email,
                message: message
            });
        });
    }
    
    // Add animation to food items on scroll
    const foodItems = document.querySelectorAll('.food-item, .menu-item');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // Observe each food item
    foodItems.forEach(item => {
        observer.observe(item);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add CSS styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .food-item, .menu-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .bar.animate:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .bar.animate:nth-child(2) {
            opacity: 0;
        }
        
        .bar.animate:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
