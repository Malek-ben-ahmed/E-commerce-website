// Import the functions you need from the SDKs you need
import { initializeApp,getApps  } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH68-ICTeCb8rzM69hm1Xr4axFwYkxFZo",
  authDomain: "e-commerce-website-ac3f1.firebaseapp.com",
  projectId: "e-commerce-website-ac3f1",
  storageBucket: "e-commerce-website-ac3f1.firebasestorage.app",
  messagingSenderId: "651738761006",
  appId: "1:651738761006:web:35384dcb28dbcb0ad9dcbf",
  measurementId: "G-FYDG55JBXK"
};

// Vérifie si une instance Firebase existe déjà
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporte les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);