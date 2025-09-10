// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjlIUAZaQpbxG4fxS3d5px0YoAwYUSRyw",
  authDomain: "diego-5b633.firebaseapp.com",
  projectId: "diego-5b633",
  storageBucket: "diego-5b633.firebasestorage.app",
  messagingSenderId: "60207191705",
  appId: "1:60207191705:web:9cc47116a42b415013ca08",
  measurementId: "G-R5YGJYPZPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db =getFirestore(app);