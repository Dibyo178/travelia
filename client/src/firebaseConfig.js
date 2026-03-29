// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAiTTSadROoBh9eUVZgjI7HHpbTBJ6XGrw",
  authDomain: "travalia-c4a88.firebaseapp.com",
  projectId: "travalia-c4a88",
  storageBucket: "travalia-c4a88.firebasestorage.app",
  messagingSenderId: "452807786098",
  appId: "1:452807786098:web:2a2b3594b988ba592b0ceb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();