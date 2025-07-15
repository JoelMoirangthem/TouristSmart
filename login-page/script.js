// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = document.querySelector('.login-btn');
const socialButtons = document.querySelectorAll('.social-btn');

// Form validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🕉️ Tourismart Login Page Initialized');
    
    // Add entrance animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Focus on email input
    emailInput.focus();
});

// Password visibility toggle
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Toggle icon
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
    
    // Add animation
    togglePassword.style.transform = 'scale(0.8)';
    setTimeout(() => {
        togglePassword.style.transform = 'scale(1)';
    }, 150);
});

// Real-time form validation
emailInput.addEventListener('input', validateEmailField);
emailInput.addEventListener('blur', validateEmailField);

passwordInput.addEventListener('input', validatePasswordField);
passwordInput.addEventListener('blur', validatePasswordField);

function validateEmailField() {
    const email = emailInput.value.trim();
    const formGroup = emailInput.closest('.form-group');
    
    if (!email) {
        resetFieldState(formGroup);
        return;
    }
    
    if (emailPattern.test(email)) {
        setFieldState(formGroup, 'success');
        hideErrorMessage(formGroup);
    } else {
        setFieldState(formGroup, 'error');
        showErrorMessage(formGroup, 'Please enter a valid email address');
    }
}

function validatePasswordField() {
    const password = passwordInput.value.trim();
    const formGroup = passwordInput.closest('.form-group');
    
    if (!password) {
        resetFieldState(formGroup);
        return;
    }
    
    if (passwordPattern.test(password)) {
        setFieldState(formGroup, 'success');
        hideErrorMessage(formGroup);
    } else {
        setFieldState(formGroup, 'error');
        showErrorMessage(formGroup, 'Password must be at least 8 characters with uppercase, lowercase, and number');
    }
}

function setFieldState(formGroup, state) {
    formGroup.classList.remove('error', 'success');
    formGroup.classList.add(state);
}

function resetFieldState(formGroup) {
    formGroup.classList.remove('error', 'success');
}

function showErrorMessage(formGroup, message) {
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideErrorMessage(formGroup) {
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate fields
    if (!validateForm()) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }
    
    // Show loading state
    setLoginButtonState('loading');
    
    try {
        // Simulate API call
        await simulateLogin(email, password);
        
        // Show success state
        setLoginButtonState('success');
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
        
    } catch (error) {
        setLoginButtonState('error');
        showNotification(error.message || 'Login failed. Please try again.', 'error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            setLoginButtonState('default');
        }, 3000);
    }
});

function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    let isValid = true;
    
    // Email validation
    if (!email) {
        setFieldState(emailInput.closest('.form-group'), 'error');
        showErrorMessage(emailInput.closest('.form-group'), 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        setFieldState(emailInput.closest('.form-group'), 'error');
        showErrorMessage(emailInput.closest('.form-group'), 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        setFieldState(passwordInput.closest('.form-group'), 'error');
        showErrorMessage(passwordInput.closest('.form-group'), 'Password is required');
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        setFieldState(passwordInput.closest('.form-group'), 'error');
        showErrorMessage(passwordInput.closest('.form-group'), 'Password must be at least 8 characters with uppercase, lowercase, and number');
        isValid = false;
    }
    
    return isValid;
}

function setLoginButtonState(state) {
    loginBtn.classList.remove('loading', 'success', 'error');
    
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon');
    
    switch (state) {
        case 'loading':
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            break;
        case 'success':
            loginBtn.classList.add('success');
            btnText.textContent = 'Success!';
            btnIcon.className = 'fas fa-check btn-icon';
            break;
        case 'error':
            loginBtn.classList.add('error');
            btnText.textContent = 'Failed';
            btnIcon.className = 'fas fa-times btn-icon';
            loginBtn.style.background = '#e74c3c';
            break;
        default:
            loginBtn.disabled = false;
            btnText.textContent = 'Sign In';
            btnIcon.className = 'fas fa-arrow-right btn-icon';
            loginBtn.style.background = '';
    }
}

// Simulate login API call
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different scenarios
            if (email === 'admin@tourismart.com' && password === 'Admin123!') {
                resolve({ success: true, user: { email, name: 'Admin User' } });
            } else if (email === 'demo@tourismart.com' && password === 'Demo123!') {
                resolve({ success: true, user: { email, name: 'Demo User' } });
            } else if (email.includes('@') && password.length >= 8) {
                resolve({ success: true, user: { email, name: 'User' } });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 2000);
    });
}

// Social login handlers
socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const provider = button.classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        // Add loading state
        button.disabled = true;
        button.innerHTML = `
            <div class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
            <span>Connecting to ${provider}...</span>
        `;
        
        // Simulate social login
        setTimeout(() => {
            showNotification(`${provider} login feature coming soon!`, 'info');
            
            // Reset button
            button.disabled = false;
            if (provider === 'Google') {
                button.innerHTML = `
                    <i class="fab fa-google"></i>
                    <span>Continue with Google</span>
                `;
            } else {
                button.innerHTML = `
                    <i class="fab fa-facebook-f"></i>
                    <span>Continue with Facebook</span>
                `;
            }
        }, 1500);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Enhanced button animations
document.querySelectorAll('button, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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

// Service cards hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Feature items hover effects
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1)';
    });
});

// Scroll to top when page loads
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to submit form
    if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement === emailInput || focusedElement === passwordInput)) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        loginForm.reset();
        resetFieldState(emailInput.closest('.form-group'));
        resetFieldState(passwordInput.closest('.form-group'));
        emailInput.focus();
    }
});

// Input animations
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.classList.remove('focused');
    });
});

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Intersection Observer for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Performance optimization - throttle scroll events
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
    // Parallax effect code here
}, 16));

// Add dynamic styles for notifications
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
        max-width: 350px;
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
    
    .notification-warning {
        background: linear-gradient(135deg, #f39c12, #e67e22);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content span {
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0.25rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .input-container.focused input {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }
    
    .input-container.focused .input-icon {
        color: var(--primary-color);
    }
    
    .service-card.animate {
        animation: bounceIn 0.6s ease-out;
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
        }
        70% {
            transform: scale(0.9) translateY(5px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Demo credentials helper
const demoCredentials = document.createElement('div');
demoCredentials.innerHTML = `
    <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        font-size: 0.8rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
    ">
        <strong>Demo Credentials:</strong><br>
        Email: demo@tourismart.com<br>
        Password: Demo123!
    </div>
`;
document.body.appendChild(demoCredentials);

// Show demo credentials for 10 seconds
setTimeout(() => {
    demoCredentials.style.opacity = '0';
    setTimeout(() => {
        demoCredentials.remove();
    }, 500);
}, 10000);

console.log('🚀 Login page fully loaded with all features!');
console.log('📧 Demo credentials: demo@tourismart.com / Demo123!');
console.log('🔐 Admin credentials: admin@tourismart.com / Admin123!');