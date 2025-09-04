import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC9Sz8VjrSN-I5tXwg5X-BAcWVIds3Ml_s",
  authDomain: "project-tracker-l2.firebaseapp.com",
  databaseURL: "https://project-tracker-l2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tracker-l2",
  storageBucket: "project-tracker-l2.firebasestorage.app",
  messagingSenderId: "721509070588",
  appId: "1:721509070588:web:a95656deb0be2a72730979",
  measurementId: "G-RRVEY8B7XG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);