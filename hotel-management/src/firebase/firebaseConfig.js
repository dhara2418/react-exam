import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 'getDatabase' ko hata diya
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxp22IIEk-D9jgnB36amRQKzZVoMT2ZDs",
  authDomain: "hotel-management-2418.firebaseapp.com",
  projectId: "hotel-management-2418",
  storageBucket: "hotel-management-2418.firebasestorage.app",
  messagingSenderId: "399651694535",
  appId: "1:399651694535:web:5ebc780463d501b7fa9be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const db = getFirestore(app);
export const auth = getAuth(app);