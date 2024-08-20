// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth function
import { getFirestore } from "firebase/firestore";
const apiKey = import.meta.env.VITE_FIREVASE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "meeshio.firebaseapp.com",
  projectId: "meeshio",
  storageBucket: "meeshio.appspot.com",
  messagingSenderId: "886116355308",
  appId: "1:886116355308:web:ac7f27749378e2ad7229c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
