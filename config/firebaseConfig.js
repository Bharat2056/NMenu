import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { restaurants, carouselImages, slots } from "../store/restaurants";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "dine-time-yt-64255.firebaseapp.com",
  projectId: "dine-time-yt-64255",
  storageBucket: "dine-time-yt-64255.appspot.com",
  messagingSenderId: "759701114943",
  appId: "1:759701114943:web:7ad5881c7d6a7db85cfb8e"
};

// Safe initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
