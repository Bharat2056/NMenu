    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCPvAR8DeVMvJ-YF-2E1bq6qBrlhZlfivk",
      authDomain: "menu-556ad.firebaseapp.com",
      projectId: "menu-556ad",
      storageBucket: "menu-556ad.firebasestorage.app",
      messagingSenderId: "365585053592",
      appId: "1:365585053592:web:452370fba52d781c585ded",
      measurementId: "G-6RF8D6JJBH"
    };

    // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);