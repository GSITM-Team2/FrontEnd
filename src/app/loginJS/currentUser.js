// currentUser.js
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import configurationInfo from "../firebase.js";
import { use } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = configurationInfo();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    const idToken = await user.getIdToken();
    return idToken;
  }
  return null;
};

export default getCurrentUserToken;
