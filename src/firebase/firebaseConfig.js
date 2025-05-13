// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB00uYpAPjgotgo2ZyArx7kaCa8ZumtsKk",
  authDomain: "foodlens-3dd69.firebaseapp.com",
  projectId: "foodlens-3dd69",
  storageBucket: "foodlens-3dd69.firebasestorage.app",
  messagingSenderId: "14176965135",
  appId: "1:14176965135:web:910b1e1c7b9eeaa8e8c97a",
  measurementId: "G-EDTHSVBB28",
  databaseURL:
    "https://foodlens-3dd69-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
