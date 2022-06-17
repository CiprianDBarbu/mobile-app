// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAflVReOafb4MqjUfNbKwDXZ4utPKTMD0Q",
  authDomain: "mobile-app-6ba68.firebaseapp.com",
  projectId: "mobile-app-6ba68",
  storageBucket: "mobile-app-6ba68.appspot.com",
  messagingSenderId: "1016841141423",
  appId: "1:1016841141423:web:bd008ce07a82fb8f26a85a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);