// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to stats numbers
const animateValue = (element, start, end, duration) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.innerHTML = end.toLocaleString() + '+';
        return;
    }
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animate stats when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = document.querySelectorAll('.stat-card h2');
            statCards.forEach(card => {
                const finalValue = parseInt(card.innerHTML);
                animateValue(card, 0, finalValue, 2000);
            });
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Add this to handle photo previews for all forms
document.addEventListener('DOMContentLoaded', function() {
    // Handle photo preview for basic form
    setupPhotoPreview('profile-photo', 'photo-preview');
    
    // Handle photo preview for farmer form
    setupPhotoPreview('farmer-profile-photo', 'farmer-photo-preview');
    
    // Handle photo preview for merchant form
    setupPhotoPreview('merchant-profile-photo', 'merchant-photo-preview');
    
    // Function to set up photo preview
    function setupPhotoPreview(inputId, previewId) {
        const photoInput = document.getElementById(inputId);
        const photoPreview = document.getElementById(previewId);
        
        if (photoInput && photoPreview) {
            photoInput.addEventListener('change', function() {
                const file = this.files[0];
                
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        photoPreview.src = e.target.result;
                    }
                    
                    reader.readAsDataURL(file);
                } else {
                    photoPreview.src = 'images/default-avatar.png'; // Default image
                }
            });
        }
    }
});

// Replace your existing role selection code with this
document.addEventListener('DOMContentLoaded', function() {
    const userTypeSelect = document.getElementById('userType');
    const signupForm = document.getElementById('signupForm');
    const basicFormContent = document.querySelector('.basic-form-content');
    const farmerFormContent = document.getElementById('farmer-form-content');
    const merchantFormContent = document.getElementById('merchant-form-content');
    
    // Show/hide sections based on user type selection
    userTypeSelect.addEventListener('change', function() {
        const selectedRole = this.value;
        
        if (selectedRole === 'farmer') {
            // Hide the basic form content
            basicFormContent.style.display = 'none';
            
            // Show the farmer-specific form
            farmerFormContent.style.display = 'block';
            merchantFormContent.style.display = 'none';
            
            // Change the form layout to two-column
            signupForm.classList.add('two-column-form');
            
        } else if (selectedRole === 'merchant') {
            // Hide the basic form content
            basicFormContent.style.display = 'none';
            
            // Show the merchant-specific form
            merchantFormContent.style.display = 'block';
            farmerFormContent.style.display = 'none';
            
            // Change the form layout to two-column
            signupForm.classList.add('two-column-form');
            
        } else {
            // Reset to basic form
            basicFormContent.style.display = 'block';
            farmerFormContent.style.display = 'none';
            merchantFormContent.style.display = 'none';
            
            // Remove two-column layout
            signupForm.classList.remove('two-column-form');
        }
    });
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Form progress functionality
    const userTypeSelect = document.getElementById('userType');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            if (this.value) {
                // Update progress indicator
                progressSteps[0].classList.add('completed');
                progressSteps[1].classList.add('active');
            } else {
                progressSteps[0].classList.remove('completed');
                progressSteps[1].classList.remove('active');
            }
        });
    }
    
    // Form submission handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            
            // Simulate API call
            setTimeout(function() {
                // Hide form
                document.querySelector('.basic-form-content').style.display = 'none';
                document.getElementById('farmer-form-content').style.display = 'none';
                document.getElementById('merchant-form-content').style.display = 'none';
                
                // Show success message
                document.getElementById('success-message').style.display = 'block';
                
                // Update progress indicator
                progressSteps[1].classList.add('completed');
                progressSteps[2].classList.add('active');
            }, 2000);
        });
    }
    
    // Enhanced input field interactions
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        // Add animation when field gains focus
        input.addEventListener('focus', function() {
            this.closest('.input-group').classList.add('focused');
        });
        
        // Remove animation when field loses focus
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.input-group').classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (input.value) {
            input.closest('.input-group').classList.add('focused');
        }
    });
    
    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;
            
            const strengthBar = this.closest('.form-group').querySelector('.password-strength');
            if (!strengthBar) {
                const bar = document.createElement('div');
                bar.className = 'password-strength';
                bar.innerHTML = '<div class="strength-bar"></div><span class="strength-text">Weak</span>';
                this.closest('.form-group').appendChild(bar);
            }
            
            const bar = this.closest('.form-group').querySelector('.strength-bar');
            const text = this.closest('.form-group').querySelector('.strength-text');
            
            if (strength === 0) {
                bar.style.width = '0%';
                bar.className = 'strength-bar';
                text.textContent = '';
            } else if (strength === 1) {
                bar.style.width = '25%';
                bar.className = 'strength-bar weak';
                text.textContent = 'Weak';
            } else if (strength === 2) {
                bar.style.width = '50%';
                bar.className = 'strength-bar medium';
                text.textContent = 'Medium';
            } else if (strength === 3) {
                bar.style.width = '75%';
                bar.className = 'strength-bar strong';
                text.textContent = 'Strong';
            } else {
                bar.style.width = '100%';
                bar.className = 'strength-bar very-strong';
                text.textContent = 'Very Strong';
            }
        });
    });
});

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        AOS.init({
            duration: prefersReducedMotion ? 0 : 600,
            easing: 'ease',
            once: true,
            disable: prefersReducedMotion
        });
    }
    
    // Testimonial slider functionality
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        let autoplayInterval;
        let cardWidth;
        
        // Function to calculate card width
        const calculateCardWidth = () => {
            cardWidth = testimonialCards[0].offsetWidth + 
                        parseInt(window.getComputedStyle(testimonialCards[0]).marginRight);
        };
        
        // Calculate initial width
        calculateCardWidth();
        
        // Recalculate on window resize
        window.addEventListener('resize', calculateCardWidth);
        
        // Function to update slider position
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateSlider();
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = Math.min(testimonialCards.length - 1, currentIndex + 1);
                updateSlider();
                resetAutoplay();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetAutoplay();
            });
        });
        
        // Function to start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
                updateSlider();
            }, 5000);
        }
        
        // Function to reset autoplay
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Start autoplay
        startAutoplay();
        
        // Pause autoplay when user hovers over slider
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        // Resume autoplay when user leaves slider
        testimonialTrack.addEventListener('mouseleave', startAutoplay);
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.scrollY;
                    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add these animations to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero section elements on page load
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const heroCta = document.querySelector('.hero .cta-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(-20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(-20px)';
        heroCta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 900);
    }
    
    // Add floating animation to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 6s ease-in-out infinite';
    });
    
    // Add scroll-triggered animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    const animateOnScroll = function() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for feature cards
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Add pulse animation to feature icons on hover
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add a subtle parallax effect to the hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) { // Only apply effect near the top of the page
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Add a scroll indicator with animation
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && !document.querySelector('.scroll-indicator')) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <p>Scroll to explore</p>
            <i class="fas fa-chevron-down bounce"></i>
        `;
        
        heroSection.appendChild(scrollIndicator);
        
        // Hide scroll indicator when user scrolls down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
});

// Add keyframe animations
if (!document.getElementById('animation-keyframes')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-keyframes';
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Add this to your existing script.js file or replace the existing stats animation code

document.addEventListener('DOMContentLoaded', function() {
    // Function to animate counting for stat numbers
    const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Use easeOutExpo for more dramatic effect at the end
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentCount = Math.floor(easeOutQuart * (end - start) + start);
            element.textContent = currentCount.toLocaleString() + '+';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Set up Intersection Observer to trigger animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all stat number elements
                const statNumbers = document.querySelectorAll('.stat-number');
                
                // Animate each stat number
                statNumbers.forEach(stat => {
                    // Get the target number from the data attribute or inner text
                    const targetNumber = parseInt(stat.getAttribute('data-count') || stat.textContent);
                    
                    // Reset the text content to ensure clean animation
                    stat.textContent = '0';
                    
                    // Start the animation with a slight delay for each stat
                    setTimeout(() => {
                        animateCounter(stat, 0, targetNumber, 2000);
                    }, 300);
                });
                
                // Disconnect observer after animation starts
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the stats container
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});
