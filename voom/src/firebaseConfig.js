// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRa4PluJig-NvKfC31lcAO6XiEh3XTE-s",
  authDomain: "ninjapost-daveton.firebaseapp.com",
  databaseURL: "https://ninjapost-daveton-default-rtdb.firebaseio.com",
  projectId: "ninjapost-daveton",
  storageBucket: "ninjapost-daveton.appspot.com",
  messagingSenderId: "1023315315749",
  appId: "1:1023315315749:web:9569060b112b9d8db243cc",
  measurementId: "G-W7WTLEFSVK"
};

// npm install -g firebase-tools

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const userRef = collection(db, "voom");
export const meetingRef = collection(db, "meetings");