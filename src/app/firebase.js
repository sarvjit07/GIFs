// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZHWogOUC016JQ_vqv2jAp9BUKQ4O4dDk",
  authDomain: "next-auth-username-pass.firebaseapp.com",
  projectId: "next-auth-username-pass",
  storageBucket: "next-auth-username-pass.appspot.com",
  messagingSenderId: "587496159728",
  appId: "1:587496159728:web:e8e0747462d0d3436e4535",
  measurementId: "G-X8NTD97YNB"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

// const analytics = getAnalytics(app);
export { app,auth }