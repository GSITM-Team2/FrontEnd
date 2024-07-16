// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import configurationInfo from "../firebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = configurationInfo();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


const Signin=(signInEmail, signInPassword) => {
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  console.log(user);
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
})};

export default Signin;

