import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDoHFl67NVy8vpwExVz65S-zbAvGMtJ-iM",
    authDomain: "imob-b968a.firebaseapp.com",
    projectId: "imob-b968a",
    storageBucket: "imob-b968a.appspot.com",
    messagingSenderId: "513581880954",
    appId: "1:513581880954:web:4fbed224a068766e83cdc3",
    measurementId: "G-HJ6ENQ5EN4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
