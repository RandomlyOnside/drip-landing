import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface SignupData {
  email: string;
  role: 'local' | 'cafe' | 'waitlist';
  createdAt?: any;
  // Optional fields for different signup types
  name?: string;
  cafeName?: string;
  posSystem?: string;
}

export interface SignupResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function saveSignupToFirestore(signupData: SignupData): Promise<SignupResult> {
  try {
    if (!db) {
      throw new Error('Firestore not initialized');
    }

    // Check for existing email first
    const { query, where, getDocs } = await import('firebase/firestore');
    const existingQuery = query(
      collection(db, 'signups'), 
      where('email', '==', signupData.email)
    );
    const existingDocs = await getDocs(existingQuery);
    
    if (!existingDocs.empty) {
      throw new Error('Email already registered');
    }

    // Prepare data with timestamp
    const dataToSave = {
      ...signupData,
      createdAt: serverTimestamp(),
    };

    // Save to 'signups' collection
    const docRef = await addDoc(collection(db, 'signups'), dataToSave);
    
    console.log('Signup saved with ID:', docRef.id);
    return {
      success: true,
      id: docRef.id,
    };
  } catch (error: any) {
    console.error('Error saving signup:', error);
    
    // Enhanced error handling (matching existing pattern)
    let errorMessage = error.message || 'Unknown error occurred';
    
    if (error.message === 'Email already registered') {
      errorMessage = 'Déjà brew — that email\'s already signed up! YAY!';
    } else if (error.code === 'permission-denied') {
      errorMessage = 'Access denied. Please try again later.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again.';
    } else if (error.message && error.message.includes('network')) {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.message && (error.message.includes('Firebase') || error.message.includes('Firestore'))) {
      errorMessage = 'Service error. Please try again later.';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Convenience function for waitlist signups
export async function submitWaitlistSignup(email: string): Promise<SignupResult> {
  const signupData: SignupData = {
    email,
    role: 'waitlist',
  };
  
  return await saveSignupToFirestore(signupData);
}

// Convenience function for local user signups
export async function submitLocalSignup(email: string): Promise<SignupResult> {
  const signupData: SignupData = {
    email,
    role: 'local',
  };
  
  return await saveSignupToFirestore(signupData);
}

// Convenience function for café signups
export async function submitCafeSignup(formData: {
  name: string;
  email: string;
  cafeName: string;
  posSystem: string;
}): Promise<SignupResult> {
  const signupData: SignupData = {
    ...formData,
    role: 'cafe',
  };
  
  return await saveSignupToFirestore(signupData);
}