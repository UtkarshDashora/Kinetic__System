import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy1TbajDGstV3AqRk0LugtWsJxRIJSbIA",
  authDomain: "we-chat-app-e96ad.firebaseapp.com",
  databaseURL: "https://we-chat-app-e96ad-default-rtdb.firebaseio.com",
  projectId: "we-chat-app-e96ad",
  storageBucket: "we-chat-app-e96ad.firebasestorage.app",
  messagingSenderId: "766611966558",
  appId: "1:766611966558:web:141cec887a3cd5f28c82cf",
  measurementId: "G-V1CH6SLN5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Realtime Database
export const db = getDatabase(app);
