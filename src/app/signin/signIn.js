// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import configurationInfo from "../firebase.js";
// import { use } from 'react';

// const firebaseConfig = configurationInfo();

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();


// const Signin=(signInEmail, signInPassword) => {
//     signInWithEmailAndPassword(auth, signInEmail, signInPassword)
// .then((userCredential) => {
//   // Signed in 
//   const user = userCredential.user;
//   console.log(user);
//   // ...
// })
// .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
// })};


// export default Signin;

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import configurationInfo from "../firebase.js";

const firebaseConfig = configurationInfo();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Signin = (signInEmail, signInPassword) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            .then((userCredential) => {
                // 로그인 성공
                const user = userCredential.user;
                console.log(user);
                resolve({success : true});
            })
            .catch((error) => {
                // 로그인 실패
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("로그인 실패:", errorCode, errorMessage);
                
                let customErrorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    customErrorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
                } else if (errorCode === 'auth/invalid-email') {
                    customErrorMessage = "유효하지 않은 이메일 형식입니다.";
                }
                
                reject({ success: false, error: customErrorMessage });
            });
    });
};

export default Signin;