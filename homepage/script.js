// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});


function goToMainIndex() {
    window.location.href = "../login-page/login-index.html";
}


// Modal Functions
function showLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Add entrance animation
    setTimeout(() => {
        loginModal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
    }, 10);
}

function hideLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginForm.reset();
}

function showSignupModal() {
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Add entrance animation
    setTimeout(() => {
        signupModal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
    }, 10);
}

function hideSignupModal() {
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    signupForm.reset();
}

function switchToSignup() {
    hideLoginModal();
    setTimeout(() => {
        showSignupModal();
    }, 200);
}

function switchToLogin() {
    hideSignupModal();
    setTimeout(() => {
        showLoginModal();
    }, 200);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        hideLoginModal();
    }
    if (event.target === signupModal) {
        hideSignupModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideLoginModal();
        hideSignupModal();
    }
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const formObject = Object.fromEntries(formData.entries());
    
    // Get submit button
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitButton.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        console.log('Login attempt:', formObject);
        
        // Simulate successful login
        submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitButton.style.background = '#27ae60';
        
        setTimeout(() => {
            hideLoginModal();
            // Redirect to main application
            window.location.href = '/dashboard';
        }, 1000);
    }, 1500);
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(signupForm);
    const formObject = Object.fromEntries(formData.entries());
    
    // Password validation
    if (formObject.password !== formObject.confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Get submit button
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitButton.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        console.log('Signup attempt:', formObject);
        
        // Simulate successful signup
        submitButton.innerHTML = '<i class="fas fa-check"></i> Account Created!';
        submitButton.style.background = '#27ae60';
        
        setTimeout(() => {
            hideSignupModal();
            showNotification('Account created successfully! Please log in.', 'success');
            setTimeout(() => {
                showLoginModal();
            }, 1000);
        }, 1000);
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.info-card, .cta-content');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Enhanced Button Animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Info Card Hover Effects
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Contact Item Click to Copy
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const contactValue = this.querySelector('.contact-value');
        if (contactValue) {
            navigator.clipboard.writeText(contactValue.textContent).then(() => {
                showNotification('Contact information copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy contact information', 'error');
            });
        }
    });
});

// Enhanced Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Real-time form validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const fieldType = field.type;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (fieldType === 'email' && fieldValue && !validateEmail(fieldValue)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (fieldType === 'password' && fieldValue && !validatePassword(fieldValue)) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    } else if (fieldType === 'tel' && fieldValue && !validatePhone(fieldValue)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        showFieldError(field, errorMessage);
    } else {
        field.classList.remove('error');
        field.style.borderColor = '';
        hideFieldError(field);
    }
}

function showFieldError(field, message) {
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Scroll to Top on Page Load
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Performance Optimization: Throttle Scroll Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16));

// Add dynamic styles for notifications and effects
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }
    
    .notification-info {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .field-error {
        display: none;
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
    
    .contact-item {
        cursor: pointer;
    }
    
    .contact-item:hover {
        background: rgba(255, 107, 53, 0.1);
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitButton.disabled = true;
        
        // Simulate newsletter subscription
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitButton.style.background = '#27ae60';
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                e.target.reset();
            }, 2000);
        }, 1000);
    });
}

// Initialize smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

console.log('🕉️ Tourismart Landing Page Initialized - Welcome to Sacred Varanasi! 🕉️');