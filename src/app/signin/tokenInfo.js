// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import configurationInfo from "../firebase.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = configurationInfo();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


const tokenInfo = 
firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
  }).catch(function(error) {
    // Handle error
  });


export default function tokenInfo(){
    return tokenInfo;
}

