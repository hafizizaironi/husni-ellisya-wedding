import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUgTSFM9I_UKzN-Fwsgc1N6-1yfbvhCck",
  authDomain: "ellisya-husni-wedding.firebaseapp.com",
  projectId: "ellisya-husni-wedding",
  storageBucket: "ellisya-husni-wedding.firebasestorage.app",
  messagingSenderId: "362595414257",
  appId: "1:362595414257:web:ba854d4a36c26a716ff950",
  measurementId: "G-VGC1ZTSETC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
