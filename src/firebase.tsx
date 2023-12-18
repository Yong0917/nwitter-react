// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5wOC-_MWvwG7Ysmyr7XUEMtfLjpGPQ14",
    authDomain: "nwitter-reloaded-fff8d.firebaseapp.com",
    projectId: "nwitter-reloaded-fff8d",
    storageBucket: "nwitter-reloaded-fff8d.appspot.com",
    messagingSenderId: "839130625097",
    appId: "1:839130625097:web:815f27fbc12e14e0377b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);