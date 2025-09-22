// Café signup page JavaScript functionality
// Handles form submission for café owner signups

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
        
        console.log('Firebase initialized successfully for cafes page');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// DOM elements
let form, nameInput, emailInput, cafeNameInput, posSystemInput, successMessage, errorMessage, errorText, loadingMessage;

// Initialize DOM elements
function initializeDOMElements() {
    form = document.getElementById('cafes-signup-form');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    cafeNameInput = document.getElementById('cafeName');
    posSystemInput = document.getElementById('posSystem');
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
    
    // Update success message content to match requirements: "We'll be in touch soon. Thanks for keeping coffee local."
    const successTitle = successMessage.querySelector('h2');
    const successText = successMessage.querySelector('p');
    
    if (successTitle) successTitle.textContent = 'Welcome to Local Drip!';
    if (successText) successText.textContent = "We'll be in touch soon. Thanks for keeping coffee local.";
    
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
        case 'name':
        case 'café name':
        case 'cafe name':
            if (trimmedValue.length < 2) {
                errors.push(`${fieldName} must be at least 2 characters long`);
            }
            if (trimmedValue.length > 100) {
                errors.push(`${fieldName} must be less than 100 characters`);
            }
            break;
        case 'pos system':
            if (trimmedValue.length > 50) {
                errors.push('POS system name must be less than 50 characters');
            }
            break;
    }
    
    return errors;
}

// Save café signup to Firestore (using pattern from app.js)
async function saveCafeSignup(formData) {
    try {
        if (!db) {
            throw new Error('Firestore not initialized');
        }
        
        const { collection, addDoc, serverTimestamp } = window.firebaseModules;
        
        // Prepare data according to requirements: { name, email, cafeName, posSystem, role: "cafe", createdAt: serverTimestamp() }
        const signupData = {
            name: formData.name,
            email: formData.email,
            cafeName: formData.cafeName,
            posSystem: formData.posSystem || null,
            role: "cafe",
            createdAt: serverTimestamp()
        };
        
        // Save to 'signups' collection
        const docRef = await addDoc(collection(db, 'signups'), signupData);
        
        console.log('Café signup saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
        
    } catch (error) {
        console.error('Error saving café signup:', error);
        return { success: false, error: error.message };
    }
}

// Handle form submission (reusing validation patterns from app.js)
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const cafeName = cafeNameInput.value.trim();
    const posSystem = posSystemInput.value.trim();
    
    // Validate all required fields (name, email, café name) and optional POS system
    const nameErrors = validateFormField('name', name, true);
    if (nameErrors.length > 0) {
        showError(nameErrors[0]);
        nameInput.focus();
        return;
    }
    
    const emailErrors = validateFormField('email', email, true);
    if (emailErrors.length > 0) {
        showError(emailErrors[0]);
        emailInput.focus();
        return;
    }
    
    const cafeNameErrors = validateFormField('café name', cafeName, true);
    if (cafeNameErrors.length > 0) {
        showError(cafeNameErrors[0]);
        cafeNameInput.focus();
        return;
    }
    
    // Validate optional POS system field
    if (posSystem) {
        const posSystemErrors = validateFormField('pos system', posSystem, false);
        if (posSystemErrors.length > 0) {
            showError(posSystemErrors[0]);
            posSystemInput.focus();
            return;
        }
    }
    
    try {
        showLoading();
        
        // Check network connectivity (pattern from app.js)
        if (!navigator.onLine) {
            throw new Error('No internet connection. Please check your network and try again.');
        }
        
        // Prepare form data
        const formData = {
            name: name,
            email: email,
            cafeName: cafeName,
            posSystem: posSystem || null
        };
        
        // Submit to Firestore with data structure: { name, email, cafeName, posSystem, role: "cafe", createdAt: serverTimestamp() }
        const result = await saveCafeSignup(formData);
        
        if (result.success) {
            // Clear form and show success with required message
            form.reset();
            showSuccess();
            console.log('Café signup successful:', result.id);
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
        nameInput.focus();
    }
}

// Setup input styling and validation
function setupInputHandling() {
    const inputs = [nameInput, emailInput, cafeNameInput, posSystemInput];
    
    inputs.forEach(input => {
        // Input styling on focus/blur
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--brand-cafe-accent)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#E5DDD5';
        });
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = '#D35400';
        } else {
            emailInput.style.borderColor = emailInput === document.activeElement ? 'var(--brand-cafe-accent)' : '#E5DDD5';
        }
    });
    
    // Real-time name validation
    nameInput.addEventListener('input', () => {
        const name = nameInput.value.trim();
        if (name && name.length < 2) {
            nameInput.style.borderColor = '#D35400';
        } else {
            nameInput.style.borderColor = nameInput === document.activeElement ? 'var(--brand-cafe-accent)' : '#E5DDD5';
        }
    });
    
    // Real-time café name validation
    cafeNameInput.addEventListener('input', () => {
        const cafeName = cafeNameInput.value.trim();
        if (cafeName && cafeName.length < 2) {
            cafeNameInput.style.borderColor = '#D35400';
        } else {
            cafeNameInput.style.borderColor = cafeNameInput === document.activeElement ? 'var(--brand-cafe-accent)' : '#E5DDD5';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
    
    // Input handling
    setupInputHandling();
    
    console.log('Event listeners initialized for cafes page');
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
    
    console.log('Local Drip cafes page initialized');
});