// ===== PORTFOLIO JAVASCRIPT FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }
                }
            }
        });
    });
    
    // ===== UPDATE ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // ===== SKILLS PROGRESS BARS ANIMATION =====
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false;
    
    function animateSkills() {
        if (skillsAnimated) return;
        
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
                bar.classList.add('animate');
            }, 100);
        });
        
        skillsAnimated = true;
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skills when skills section comes into view
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
                
                // Add fade-in-up animation to other sections
                const animatableElements = entry.target.querySelectorAll('.timeline-item, .project-card, .achievement-item, .experience-item, .hobby-item');
                animatableElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('fade-in-up');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // ===== EMAIL VALIDATION =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== SHOW ALERT FUNCTION =====
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
                ${message}
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 5000);
    }
    
    // ===== RESUME DOWNLOAD HANDLER =====
    const downloadResumeBtn = document.getElementById('downloadResume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // showAlert('Resume download feature will be implemented soon!', 'info');
        });
    }
    
    // ===== TYPED TEXT EFFECT FOR HERO SECTION =====
    function initTypedEffect() {
        const heroTagline = document.querySelector('.hero-tagline');
        const texts = [
            'Computer Science Student | Competitive Coder | Problem Solver',
            'Quick Learner | Team Player | Teaching Enthusiast',
            'C++ Developer | Java Programmer | DSA Expert'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typedText = '';
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            heroTagline.textContent = typedText;
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Wait at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Wait before typing next text
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }
    
    // Initialize typed effect
    initTypedEffect();
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollToTop';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== PRELOADER =====
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== PARTICLES ANIMATION FOR HERO BACKGROUND =====
    function createParticles() {
        const hero = document.querySelector('.hero-section');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }
    
    createParticles();
});

// ===== ADDITIONAL CSS FOR JAVASCRIPT COMPONENTS =====
const additionalStyles = `
<style>
/* Alert Styles */
.custom-alert {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
}

.alert-success {
    background: #10b981;
    color: white;
}

.alert-error {
    background: #ef4444;
    color: white;
}

.alert-info {
    background: #3b82f6;
    color: white;
}

.alert-content {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.alert-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    margin-left: 1rem;
}

/* Scroll to Top Button */
.scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.scroll-to-top.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.scroll-to-top:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
}

/* Preloader Styles */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
}

.preloader-content {
    text-align: center;
}

.preloader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

/* Particles Animation */
.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float linear infinite;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes float {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .custom-alert {
        right: 10px;
        left: 10px;
        min-width: auto;
    }
    
    .scroll-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
