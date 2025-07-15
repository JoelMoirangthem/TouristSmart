// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const progressSteps = document.querySelectorAll('.progress-step');
const formSteps = document.querySelectorAll('.form-step');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const interestItems = document.querySelectorAll('.interest-item');
const socialButtons = document.querySelectorAll('.social-btn');
const experienceSlides = document.querySelectorAll('.experience-slide');

// Form state
let currentStep = 1;
let formData = {};
let selectedInterests = [];
let carouselIndex = 0;

// Form validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🕉️ Tourismart Registration Page Initialized');
    
    // Initialize carousel
    startCarousel();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize password toggles
    initializePasswordToggles();
    
    // Initialize interest selection
    initializeInterestSelection();
    
    // Initialize social buttons
    initializeSocialButtons();
    
    // Focus on first input
    document.getElementById('firstName').focus();
});

// Carousel functionality
function startCarousel() {
    setInterval(() => {
        experienceSlides[carouselIndex].classList.remove('active');
        carouselIndex = (carouselIndex + 1) % experienceSlides.length;
        experienceSlides[carouselIndex].classList.add('active');
    }, 4000);
}

// Password toggle functionality
function initializePasswordToggles() {
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
            
            // Animation
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Interest selection functionality
function initializeInterestSelection() {
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedInterests = selectedInterests.filter(interest => interest !== value);
            } else {
                this.classList.add('selected');
                selectedInterests.push(value);
            }
            
            // Update form data
            formData.interests = selectedInterests;
            
            // Animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Social buttons functionality
function initializeSocialButtons() {
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            
            // Add loading state
            this.disabled = true;
            this.innerHTML = `
                <div class="spinner" style="width: 16px; height: 16px; border-width: 2px; border-color: rgba(255, 107, 53, 0.3); border-top-color: var(--primary-color);"></div>
                <span>Connecting to ${provider}...</span>
            `;
            
            // Simulate social registration
            setTimeout(() => {
                showNotification(`${provider} registration feature coming soon!`, 'info');
                
                // Reset button
                this.disabled = false;
                if (provider === 'Google') {
                    this.innerHTML = `
                        <i class="fab fa-google"></i>
                        <span>Google</span>
                    `;
                } else {
                    this.innerHTML = `
                        <i class="fab fa-facebook-f"></i>
                        <span>Facebook</span>
                    `;
                }
            }, 2000);
        });
    });
}

// Form validation initialization
function initializeFormValidation() {
    // Real-time validation for all inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value, strengthFill, strengthText);
    });
}

// Password strength checker
function updatePasswordStrength(password, strengthFill, strengthText) {
    let strength = 0;
    let strengthLabel = '';
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    strengthFill.classList.remove('weak', 'fair', 'good', 'strong');
    
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthLabel = 'Weak';
    } else if (strength === 3) {
        strengthFill.classList.add('fair');
        strengthLabel = 'Fair';
    } else if (strength === 4) {
        strengthFill.classList.add('good');
        strengthLabel = 'Good';
    } else if (strength === 5) {
        strengthFill.classList.add('strong');
        strengthLabel = 'Strong';
    }
    
    strengthText.textContent = strengthLabel;
}

// Field validation
function validateField(field) {
    const fieldType = field.type;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const formGroup = field.closest('.form-group');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !fieldValue) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Specific field validations
    if (fieldValue && fieldType === 'email' && !emailPattern.test(fieldValue)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    if (fieldValue && fieldType === 'tel' && !phonePattern.test(fieldValue.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (fieldValue && fieldName === 'password' && !passwordPattern.test(fieldValue)) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (fieldName === 'confirmPassword') {
        const password = document.getElementById('password').value;
        if (fieldValue && fieldValue !== password) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    if (fieldType === 'date' && fieldValue) {
        const birthDate = new Date(fieldValue);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 13) {
            isValid = false;
            errorMessage = 'You must be at least 13 years old to register';
        } else if (age > 120) {
            isValid = false;
            errorMessage = 'Please enter a valid date of birth';
        }
    }
    
    // Update field state
    if (isValid) {
        setFieldState(formGroup, 'success');
        hideErrorMessage(formGroup);
    } else {
        setFieldState(formGroup, 'error');
        showErrorMessage(formGroup, errorMessage);
    }
    
    return isValid;
}

// Helper functions
function getFieldLabel(fieldName) {
    const labels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        dateOfBirth: 'Date of Birth',
        budget: 'Budget',
        groupSize: 'Group Size',
        language: 'Language'
    };
    return labels[fieldName] || fieldName;
}

function setFieldState(formGroup, state) {
    formGroup.classList.remove('error', 'success');
    formGroup.classList.add(state);
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

// Step navigation
function nextStep() {
    if (currentStep === 1) {
        if (!validateStep1()) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }
        collectStep1Data();
    } else if (currentStep === 2) {
        if (!validateStep2()) {
            showNotification('Please complete your preferences', 'error');
            return;
        }
        collectStep2Data();
        submitRegistration();
        return;
    }
    
    // Move to next step
    currentStep++;
    updateProgressIndicator();
    showStep(currentStep);
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressIndicator();
        showStep(currentStep);
    }
}

function updateProgressIndicator() {
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

function showStep(stepNumber) {
    formSteps.forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
}

// Step validation
function validateStep1() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'dateOfBirth'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check terms acceptance
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showNotification('Please accept the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    return isValid;
}

function validateStep2() {
    const requiredFields = ['budget', 'groupSize', 'language'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            validateField(field);
            isValid = false;
        }
    });
    
    // Check if at least one interest is selected
    if (selectedInterests.length === 0) {
        showNotification('Please select at least one interest', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Data collection
function collectStep1Data() {
    formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        newsletter: document.getElementById('newsletter').checked
    };
}

function collectStep2Data() {
    formData = {
        ...formData,
        budget: document.getElementById('budget').value,
        groupSize: document.getElementById('groupSize').value,
        language: document.getElementById('language').value,
        interests: selectedInterests,
        requirements: Array.from(document.querySelectorAll('input[name="requirements"]:checked')).map(cb => cb.value)
    };
}

// Registration submission
async function submitRegistration() {
    try {
        // Show loading state
        showNotification('Creating your account...', 'info');
        
        // Simulate API call
        await simulateRegistration(formData);
        
        // Move to completion step
        currentStep = 3;
        updateProgressIndicator();
        showStep(3);
        
        // Show success notification
        showNotification('Registration successful! Welcome to Tourismart!', 'success');
        
    } catch (error) {
        showNotification(error.message || 'Registration failed. Please try again.', 'error');
        
        // Go back to step 2
        currentStep = 2;
        updateProgressIndicator();
        showStep(2);
    }
}

// Simulate registration API call
function simulateRegistration(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different scenarios
            if (data.email === 'test@example.com') {
                reject(new Error('Email already exists'));
            } else if (data.firstName.length < 2) {
                reject(new Error('First name must be at least 2 characters'));
            } else {
                resolve({
                    success: true,
                    user: {
                        id: Math.random().toString(36).substr(2, 9),
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email
                    }
                });
            }
        }, 2500);
    });
}

// Complete registration
function completeRegistration() {
    // Show loading state
    const button = document.querySelector('.btn-complete');
    button.classList.add('loading');
    button.disabled = true;
    
    setTimeout(() => {
        // Redirect to dashboard
        window.location.href = '/dashboard';
    }, 1500);
}

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
document.querySelectorAll('button, .social-btn, .interest-item').forEach(element => {
    element.addEventListener('click', function(e) {
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Enter key to proceed
    if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.tagName === 'INPUT') {
            e.preventDefault();
            const nextButton = document.querySelector('.form-step.active .btn-next');
            if (nextButton) {
                nextButton.click();
            }
        }
    }
    
    // Escape key to go back
    if (e.key === 'Escape') {
        const prevButton = document.querySelector('.form-step.active .btn-prev');
        if (prevButton) {
            prevButton.click();
        }
    }
});

// Form autosave (to localStorage)
function autosaveForm() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        budget: document.getElementById('budget').value,
        groupSize: document.getElementById('groupSize').value,
        language: document.getElementById('language').value,
        interests: selectedInterests,
        newsletter: document.getElementById('newsletter').checked
    };
    
    localStorage.setItem('tourismart_registration', JSON.stringify(formData));
}

// Load saved form data
function loadSavedData() {
    const savedData = localStorage.getItem('tourismart_registration');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Populate form fields
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = data[key];
            }
        });
        
        // Restore selected interests
        if (data.interests) {
            selectedInterests = data.interests;
            interestItems.forEach(item => {
                if (selectedInterests.includes(item.getAttribute('data-value'))) {
                    item.classList.add('selected');
                }
            });
        }
        
        // Restore newsletter checkbox
        if (data.newsletter) {
            document.getElementById('newsletter').checked = true;
        }
    }
}

// Auto-save on input changes
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', autosaveForm);
});

// Load saved data on page load
window.addEventListener('load', loadSavedData);

// Clear saved data on successful registration
function clearSavedData() {
    localStorage.removeItem('tourismart_registration');
}

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Performance optimization
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

// Apply throttling to expensive operations
window.addEventListener('scroll', throttle(() => {
    // Parallax code here
}, 16));

// Dynamic styles for notifications
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
`;
document.head.appendChild(style);

console.log('🚀 Registration page fully loaded with all features!');
console.log('💾 Auto-save enabled for better user experience');
console.log('🎯 Multi-step registration with validation ready');