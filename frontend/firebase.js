import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortex-ai-69d8e.firebaseapp.com",
  projectId: "cortex-ai-69d8e",
  storageBucket: "cortex-ai-69d8e.firebasestorage.app",
  messagingSenderId: "899192848969",
  appId: "1:899192848969:web:5ff65b950e189a75433598",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();
