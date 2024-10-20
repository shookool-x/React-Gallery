import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6ESFrnc1phqUWEZpwqcxH8UQMD9KElxE",
  authDomain: "gallery-amir.firebaseapp.com",
  projectId: "gallery-amir",
  storageBucket: "gallery-amir.appspot.com",
  messagingSenderId: "159247828703",
  appId: "1:159247828703:web:5371d16627160a91568b6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { db, storage };
