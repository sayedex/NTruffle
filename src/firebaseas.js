// Import the functions you need from the SDKs you need
import firebase  from "firebase";
import {firestore}  from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcHZBTdRYX1-PNru4xI2iv_EV4A3_QBq0",
  authDomain: "whatsappclone-d5d75.firebaseapp.com",
  projectId: "whatsappclone-d5d75",
  storageBucket: "whatsappclone-d5d75.appspot.com",
  messagingSenderId: "580765624921",
  appId: "1:580765624921:web:81b1f33e8f4cdc741fdf48",
  measurementId: "G-XSN3ZRBDFE"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;
