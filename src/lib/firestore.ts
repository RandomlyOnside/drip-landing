import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface SignupFormData {
  email: string;
  role: 'local' | 'cafe';
}

export interface SignupDocument extends SignupFormData {
  createdAt: Timestamp;
}

/**
 * Save signup data to Firestore
 * @param data - The signup form data
 * @returns Promise that resolves to the document ID
 */
export async function saveSignupData(data: SignupFormData): Promise<string> {
  try {
    // Check if email already exists
    const isDuplicate = await checkDuplicateEmail(data.email);
    if (isDuplicate) {
      throw new Error('Email already registered');
    }

    // Create document with timestamp
    const signupDoc: SignupDocument = {
      ...data,
      createdAt: Timestamp.now(),
    };

    // Add document to 'signups' collection
    const docRef = await addDoc(collection(db, 'signups'), signupDoc);
    return docRef.id;
  } catch (error) {
    console.error('Error saving signup data:', error);
    throw error;
  }
}

/**
 * Check if an email already exists in the signups collection
 * @param email - The email to check
 * @returns Promise that resolves to boolean indicating if email exists
 */
export async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const q = query(collection(db, 'signups'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking duplicate email:', error);
    throw error;
  }
}