// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-f10da.firebaseapp.com",
  projectId: "realestate-f10da",
  storageBucket: "realestate-f10da.appspot.com",
  messagingSenderId: "254114310621",
  appId: "1:254114310621:web:658e94d6434dc5ba7c6e34",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
