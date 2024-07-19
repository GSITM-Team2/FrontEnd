import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import configurationInfo from "../firebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = configurationInfo();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

 const Signup =(signUpemail, signUppassword)=>{
        createUserWithEmailAndPassword(auth, signUpemail, signUppassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("회원가입 성공")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("회원가입 실패")
        });
    };
    export default Signup;