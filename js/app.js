// Firebase configuration boilerplate
// Replace these placeholder values with your actual Firebase project configuration
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

// Initialize Firebase function
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
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
}

// Save signup data to Firestore
async function saveSignupToFirestore(signupData) {
  try {
    if (!db) {
      throw new Error('Firestore not initialized');
    }
    
    const { collection, addDoc, serverTimestamp } = window.firebaseModules;
    
    // Prepare data with timestamp using new data structure
    const dataToSave = {
      ...signupData,
      createdAt: serverTimestamp()
    };
    
    // Save to 'signups' collection
    const docRef = await addDoc(collection(db, 'signups'), dataToSave);
    
    console.log('Signup saved with ID:', docRef.id);
    return { success: true, id: docRef.id };
    
  } catch (error) {
    console.error('Error saving signup:', error);
    return { success: false, error: error.message };
  }
}

// Save local signup to Firestore
async function submitLocalSignup(email) {
  const signupData = {
    email: email,
    role: "local"
  };
  
  return await saveSignupToFirestore(signupData);
}

// Save café signup to Firestore
async function submitCafeSignup(formData) {
  const signupData = {
    name: formData.name,
    email: formData.email,
    cafeName: formData.cafeName,
    posSystem: formData.posSystem || null,
    role: "cafe"
  };
  
  return await saveSignupToFirestore(signupData);
}

// Show success state with custom message
function showSuccess(message) {
  // Create or update success message element
  let successElement = document.getElementById('success-state');
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.id = 'success-state';
    successElement.className = 'text-center p-6 bg-green-50 border border-green-200 rounded-lg';
    successElement.setAttribute('role', 'status');
    successElement.setAttribute('aria-live', 'polite');
  }
  
  successElement.innerHTML = `
    <div class="flex items-center justify-center mb-4">
      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <p class="text-green-800 font-medium">${message}</p>
  `;
  
  // Find form container and replace it with success message
  const formContainer = document.querySelector('form').parentElement;
  formContainer.innerHTML = '';
  formContainer.appendChild(successElement);
  
  console.log('Success message displayed:', message);
}

// Handle and display errors
function handleError(error) {
  console.error('Error occurred:', error);
  
  // Enhanced error handling for different error types
  let errorMessage = error.message;
  
  if (error.code === 'permission-denied') {
    errorMessage = 'Access denied. Please try again later.';
  } else if (error.code === 'unavailable') {
    errorMessage = 'Service temporarily unavailable. Please try again.';
  } else if (error.message.includes('network')) {
    errorMessage = 'Network error. Please check your connection and try again.';
  } else if (error.message.includes('Firebase')) {
    errorMessage = 'Service error. Please try again later.';
  }
  
  // Create or update error message element
  let errorElement = document.getElementById('error-state');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'error-state';
    errorElement.className = 'text-red-600 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'assertive');
  }
  
  errorElement.innerHTML = `
    <div class="flex items-center">
      <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      <span><strong>Error:</strong> ${errorMessage}</span>
    </div>
  `;
  
  // Insert error message after the form
  const form = document.querySelector('form');
  if (form && !document.getElementById('error-state')) {
    form.parentElement.appendChild(errorElement);
  }
  
  return errorMessage;
}

// DOM elements
let drinkerBtn, cafeBtn, formContainer, signupForm, emailInput, userTypeInput, successMessage;

// Form state management
let currentUserType = '';

// Initialize DOM elements
function initializeDOMElements() {
  drinkerBtn = document.getElementById('drinker-btn');
  cafeBtn = document.getElementById('cafe-btn');
  formContainer = document.getElementById('form-container');
  signupForm = document.getElementById('signup-form');
  emailInput = document.getElementById('email');
  userTypeInput = document.getElementById('user-type');
  successMessage = document.getElementById('success-message');
}

// Show form for specific user type
function showForm(userType) {
  currentUserType = userType;
  userTypeInput.value = userType;
  
  // Hide success message if visible
  successMessage.classList.add('hidden');
  
  // Show form container
  formContainer.classList.remove('hidden');
  
  // Update form title for screen readers
  const formTitle = userType === 'drinker' ? 'Coffee Drinker Email Signup' : 'Café Owner Email Signup';
  const formTitleElement = document.getElementById('form-title');
  if (formTitleElement) {
    formTitleElement.textContent = formTitle;
  }
  
  // Update ARIA label for form
  signupForm.setAttribute('aria-label', formTitle);
  
  // Focus on email input for better UX and announce form to screen readers
  setTimeout(() => {
    emailInput.focus();
  }, 100);
  
  console.log(`Showing form for: ${formTitle}`);
}

// Hide form
function hideForm() {
  formContainer.classList.add('hidden');
  resetForm();
}

// Reset form to initial state
function resetForm() {
  signupForm.reset();
  userTypeInput.value = '';
  currentUserType = '';
  clearValidationErrors();
  clearSubmissionErrors();
  
  // Reset button state and re-enable inputs
  hideLoadingState();
  
  // Ensure email input is enabled
  emailInput.disabled = false;
}

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate form fields with enhanced validation
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

// Display validation error
function showValidationError(message) {
  // Remove existing error message
  clearValidationErrors();
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.id = 'email-error';
  errorDiv.className = 'text-red-400 text-sm mt-1';
  errorDiv.textContent = message;
  errorDiv.setAttribute('role', 'alert');
  errorDiv.setAttribute('aria-live', 'polite');
  
  // Insert error message after email input
  emailInput.parentNode.appendChild(errorDiv);
  
  // Add error styling to input and update ARIA
  emailInput.classList.add('border-red-400');
  emailInput.setAttribute('aria-invalid', 'true');
  emailInput.setAttribute('aria-describedby', 'email-error email-help');
}

// Clear validation errors
function clearValidationErrors() {
  const existingError = document.getElementById('email-error');
  if (existingError) {
    existingError.remove();
  }
  emailInput.classList.remove('border-red-400');
  emailInput.setAttribute('aria-invalid', 'false');
  emailInput.setAttribute('aria-describedby', 'email-help');
}

// Real-time email validation
function setupRealTimeValidation() {
  emailInput.addEventListener('input', function() {
    const email = emailInput.value.trim();
    
    if (email === '') {
      clearValidationErrors();
      return;
    }
    
    if (!validateEmail(email)) {
      showValidationError('Please enter a valid email address');
    } else {
      clearValidationErrors();
    }
  });
  
  // Clear errors when user focuses on input
  emailInput.addEventListener('focus', function() {
    clearValidationErrors();
  });
}

// Handle form submission
async function handleFormSubmission(event) {
  event.preventDefault();
  
  const email = emailInput.value.trim();
  
  // Validate email
  if (!email) {
    showValidationError('Email address is required');
    emailInput.focus();
    return;
  }
  
  if (!validateEmail(email)) {
    showValidationError('Please enter a valid email address');
    emailInput.focus();
    return;
  }
  
  // Clear any existing errors
  clearValidationErrors();
  clearSubmissionErrors();
  
  // Show loading state
  showLoadingState();
  
  // Prepare form data
  const formData = {
    email: email,
    role: currentUserType === 'drinker' ? 'local' : 'cafe'
  };
  
  console.log('Submitting form data:', formData);
  
  try {
    // Check network connectivity
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }
    
    // Save to Firestore
    const result = await saveSignupToFirestore(formData);
    
    if (result.success) {
      console.log('Signup saved successfully with ID:', result.id);
      showSuccessMessage();
    } else {
      throw new Error(result.error || 'Failed to save signup');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Enhanced error handling for different error types
    let errorMessage = error.message;
    
    if (error.code === 'permission-denied') {
      errorMessage = 'Access denied. Please try again later.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again.';
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.message.includes('Firebase')) {
      errorMessage = 'Service error. Please try again later.';
    }
    
    showSubmissionError(errorMessage);
  } finally {
    hideLoadingState();
  }
}

// Show loading state
function showLoadingState() {
  const submitBtn = signupForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
  
  // Disable form inputs during submission
  emailInput.disabled = true;
  
  // Add loading indicator
  const loadingSpinner = document.createElement('span');
  loadingSpinner.id = 'loading-spinner';
  loadingSpinner.className = 'inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2';
  submitBtn.insertBefore(loadingSpinner, submitBtn.firstChild);
}

// Hide loading state
function hideLoadingState() {
  const submitBtn = signupForm.querySelector('button[type="submit"]');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Sign Me Up';
  submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
  
  // Re-enable form inputs
  emailInput.disabled = false;
  
  // Remove loading indicator
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
}

// Clear submission errors
function clearSubmissionErrors() {
  const existingError = document.getElementById('submission-error');
  if (existingError) {
    existingError.remove();
  }
}

// Show submission error
function showSubmissionError(errorMessage) {
  // Clear any existing errors first
  clearSubmissionErrors();
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.id = 'submission-error';
  errorDiv.className = 'text-red-400 text-sm mt-2 p-3 bg-red-900 bg-opacity-20 rounded border border-red-400 border-opacity-30';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.setAttribute('aria-live', 'assertive');
  errorDiv.setAttribute('tabindex', '0');
  errorDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      <span><strong>Error:</strong> ${errorMessage}</span>
    </div>
  `;
  
  // Insert error message after the form
  signupForm.appendChild(errorDiv);
  
  // Focus on error for screen readers
  setTimeout(() => {
    errorDiv.focus();
  }, 100);
  
  // Auto-remove error after 8 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 8000);
  
  // Allow manual dismissal by clicking or pressing Enter/Space
  errorDiv.addEventListener('click', () => {
    errorDiv.remove();
  });
  
  errorDiv.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      errorDiv.remove();
    }
  });
  
  // Add cursor pointer to indicate clickable
  errorDiv.style.cursor = 'pointer';
  errorDiv.title = 'Click or press Enter to dismiss';
}

// Show success message
function showSuccessMessage() {
  // Hide form
  formContainer.classList.add('hidden');
  
  // Show success message
  successMessage.classList.remove('hidden');
  
  // Reset form state completely
  resetForm();
  
  // Auto-hide success message after 5 seconds and allow user to start over
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
  
  console.log('Success message displayed');
}

// Setup event listeners
function setupEventListeners() {
  // CTA button event listeners
  drinkerBtn.addEventListener('click', () => showForm('drinker'));
  cafeBtn.addEventListener('click', () => showForm('cafe'));
  
  // Form submission event listener
  signupForm.addEventListener('submit', handleFormSubmission);
  
  // Setup real-time validation
  setupRealTimeValidation();
  
  console.log('Event listeners initialized');
}

// Network connectivity monitoring
function setupNetworkMonitoring() {
  // Handle online/offline events
  window.addEventListener('online', function() {
    console.log('Network connection restored');
    clearSubmissionErrors();
  });
  
  window.addEventListener('offline', function() {
    console.log('Network connection lost');
    showSubmissionError('No internet connection. Please check your network.');
  });
}

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
  initializeFirebase();
  initializeDOMElements();
  setupEventListeners();
  setupNetworkMonitoring();
  
  console.log('Local Drip app initialized');
});