// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7OSq7HGpyevyK1Fcg8dmykR-FYh3bX1Y",
  authDomain: "afridev-617e8.firebaseapp.com",
  projectId: "afridev-617e8",
  storageBucket: "afridev-617e8.appspot.com",
  messagingSenderId: "97321276367",
  appId: "1:97321276367:web:93a87e4d77f8846a4db8ba",
  measurementId: "G-GWS5WF794W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);