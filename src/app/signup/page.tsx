// 'use client';

// import React, { useState } from 'react';
// import styles from './styles.module.css';
// import Signup from './signUp';
// import seoulIllor from '../../../public/img/seoul.png'
// import Image from 'next/image'

// const SignupPage: React.FC = () => {
//     const [isSignUp, setIsSignUp] = useState(true);

//     const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         const signUpEmail = (document.getElementById('signUpEmail') as HTMLInputElement).value;
//         const signUpPassword = (document.getElementById('signUpPassword') as HTMLInputElement).value;
//         const repeatPassword = (document.getElementById('repeatPassword') as HTMLInputElement).value;

//         if (signUpPassword !== repeatPassword) {
//             console.log("비밀번호가 일치하지 않습니다.");
//             return;
//         }

//         await Signup(signUpEmail, signUpPassword);
//     };

//     const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//         event.preventDefault();
//         window.location.href = '/signin'; // Sign In 페이지로 이동
//     };

//     return (
//         <div>
//             <div className={styles.layout}>
//             <div className={styles.container}>
//                 <div>
//                 <Image
//                     src={seoulIllor}
//                     alt=''
//                     width={200}
//                     height={100}
//                 />
//                 </div>
//                 <h1 className={styles.title}>CULTURE LAND</h1>
//                 <form className={styles.form}>
//                     <div className={styles.inputBlock}>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className={styles.input}
//                             id="signInEmail"
//                         />
//                     </div>
//                     <div className={styles.inputBlock}>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className={styles.input}
//                             id="signInPassword"
//                         />
//                     </div>
//                     {isSignUp && (
//                         <div className={styles.inputBlock}>
//                             <input
//                                 type="password"
//                                 placeholder="Repeat Password"
//                                 className={styles.input}
//                                 id="repeatPassword"
//                             />
//                         </div>
//                     )}
//                     <button
//                         id="signInButton"
//                         className={styles.signinBtn}
//                         type="submit"
//                         onClick={handleSignUp}
//                     >Sign up
//                     </button>
//                 </form>
//                 <div className={styles.font2}> 회원가입이 완료 되었습니다. <b style={{paddingLeft: 30}} onClick={handleSignInClick}>sign in</b>
//                 </div>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;
