// Local signup page JavaScript functionality
// Handles form submission for local coffee drinker signups

// Import shared Firebase utilities from app.js
// This script assumes app.js is loaded first or Firebase is initialized globally

// Firebase configuration (reuse from app.js)
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase app and database instances
let app;
let db;

// Initialize Firebase (reusing pattern from app.js)
function initializeFirebase() {
    try {
        // Check if Firebase modules are available
        if (!window.firebaseModules) {
            throw new Error('Firebase modules not loaded');
        }
        
        const { initializeApp, getFirestore } = window.firebaseModules;
        
        // Initialize Firebase app
        app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        db = getFirestore(app);
        
        console.log('Firebase initialized successfully for locals page');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// DOM elements
let form, emailInput, successMessage, errorMessage, errorText, loadingMessage;

// Initialize DOM elements
function initializeDOMElements() {
    form = document.getElementById('locals-signup-form');
    emailInput = document.getElementById('email');
    successMessage = document.getElementById('success-message');
    errorMessage = document.getElementById('error-message');
    errorText = document.getElementById('error-text');
    loadingMessage = document.getElementById('loading-message');
}

// Hide all messages
function hideAllMessages() {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'none';
}

// Show success message with specific text from requirements
function showSuccess() {
    hideAllMessages();
    
    // Update success message content to match requirements: "You're on the list — your first cup's on us at launch."
    const successTitle = successMessage.querySelector('h2');
    const successText = successMessage.querySelector('p');
    
    if (successTitle) successTitle.textContent = 'Welcome to Local Drip!';
    if (successText) successText.textContent = "You're on the list — your first cup's on us at launch.";
    
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Focus on success message for screen readers
    successMessage.setAttribute('tabindex', '-1');
    successMessage.focus();
}

// Show error message
function showError(message) {
    hideAllMessages();
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Focus on error message for screen readers
    errorMessage.setAttribute('tabindex', '-1');
    errorMessage.focus();
}

// Show loading message
function showLoading() {
    hideAllMessages();
    loadingMessage.style.display = 'block';
}

// Email validation function (reused from app.js)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate form fields with enhanced validation (reused pattern from app.js)
function validateFormField(fieldName, value, isRequired = true) {
    const errors = [];
    
    if (isRequired && (!value || value.trim() === '')) {
        errors.push(`${fieldName} is required`);
        return errors;
    }
    
    if (!value || value.trim() === '') {
        return errors; // No validation needed for optional empty fields
    }
    
    const trimmedValue = value.trim();
    
    switch (fieldName.toLowerCase()) {
        case 'email':
            if (!validateEmail(trimmedValue)) {
                errors.push('Please enter a valid email address');
            }
            break;
    }
    
    return errors;
}

// Save local signup to Firestore (using pattern from app.js)
async function saveLocalSignup(email) {
    try {
        if (!db) {
            throw new Error('Firestore not initialized');
        }
        
        const { collection, addDoc, serverTimestamp } = window.firebaseModules;
        
        // Prepare data according to requirements: { email, role: "local", createdAt: serverTimestamp() }
        const signupData = {
            email: email,
            role: "local",
            createdAt: serverTimestamp()
        };
        
        // Save to 'signups' collection
        const docRef = await addDoc(collection(db, 'signups'), signupData);
        
        console.log('Local signup saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
        
    } catch (error) {
        console.error('Error saving local signup:', error);
        return { success: false, error: error.message };
    }
}

// Handle form submission (reusing validation patterns from app.js)
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Use validation pattern from app.js
    const emailErrors = validateFormField('email', email, true);
    if (emailErrors.length > 0) {
        showError(emailErrors[0]);
        emailInput.focus();
        return;
    }
    
    try {
        showLoading();
        
        // Check network connectivity (pattern from app.js)
        if (!navigator.onLine) {
            throw new Error('No internet connection. Please check your network and try again.');
        }
        
        // Submit to Firestore with data structure: { email, role: "local", createdAt: serverTimestamp() }
        const result = await saveLocalSignup(email);
        
        if (result.success) {
            // Clear form and show success with required message
            form.reset();
            showSuccess();
            console.log('Local signup successful:', result.id);
        } else {
            throw new Error(result.error || 'Failed to save signup');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Enhanced error handling (reused from app.js)
        let errorMessage = error.message;
        
        if (error.code === 'permission-denied') {
            errorMessage = 'Access denied. Please try again later.';
        } else if (error.code === 'unavailable') {
            errorMessage = 'Service temporarily unavailable. Please try again.';
        } else if (error.message.includes('network')) {
            errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('Firebase') || error.message.includes('Firestore')) {
            errorMessage = 'Service error. Please try again later.';
        }
        
        showError(errorMessage);
        emailInput.focus();
    }
}

// Setup input styling and validation
function setupInputHandling() {
    // Input styling on focus/blur
    emailInput.addEventListener('focus', () => {
        emailInput.style.borderColor = 'var(--brand-local-accent)';
    });
    
    emailInput.addEventListener('blur', () => {
        emailInput.style.borderColor = '#E5DDD5';
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = '#D35400';
        } else {
            emailInput.style.borderColor = emailInput === document.activeElement ? 'var(--brand-local-accent)' : '#E5DDD5';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
    
    // Input handling
    setupInputHandling();
    
    console.log('Event listeners initialized for locals page');
}

// Network connectivity monitoring
function setupNetworkMonitoring() {
    window.addEventListener('online', function() {
        console.log('Network connection restored');
        hideAllMessages();
    });
    
    window.addEventListener('offline', function() {
        console.log('Network connection lost');
        showError('No internet connection. Please check your network.');
    });
}

// Application initialization (following app.js pattern)
document.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    setupEventListeners();
    setupNetworkMonitoring();
    
    // Initialize Firebase (synchronous like app.js)
    const firebaseInitialized = initializeFirebase();
    if (!firebaseInitialized) {
        showError('Unable to connect to service. Please refresh the page and try again.');
    }
    
    console.log('Local Drip locals page initialized');
});