// Import the Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlJb6gIlRY3ZFc8_8opGEwlgLbnAirNDY",
  authDomain: "mindtracker-827fe.firebaseapp.com",
  projectId: "mindtracker-827fe",
  storageBucket: "mindtracker-827fe.firebasestorage.app",
  messagingSenderId: "246912821179",
  appId: "1:246912821179:web:2d67e4acdfabcb6c56069e",
  measurementId: "G-KSQ8W78HHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
