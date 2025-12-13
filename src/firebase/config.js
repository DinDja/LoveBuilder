import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDngsg2NCTveN71acJ4VGDmvsSSPFuvsAM",
  authDomain: "lovebuilder-87763.firebaseapp.com",
  projectId: "lovebuilder-87763",
  storageBucket: "lovebuilder-87763.firebasestorage.app",
  messagingSenderId: "272837748642",
  appId: "1:272837748642:web:fd717fda7506c52aeeb4fb",
  measurementId: "G-5D1X2JNVHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Serviços
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;