// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl4_KjcNC2dQcKecJwts360nDqQFJ8hWQ",
  authDomain: "dine-time-yt-17139.firebaseapp.com",
  projectId: "dine-time-yt-17139",
  storageBucket: "dine-time-yt-17139.firebasestorage.app",
  messagingSenderId: "323321920248",
  appId: "1:323321920248:web:057bc1a2b34267cca9990d",
  measurementId: "G-9BE9RZDL0P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);