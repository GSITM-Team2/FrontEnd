'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Signup from './signUp';

const SignupPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const signUpEmail = (document.getElementById('signUpEmail') as HTMLInputElement).value;
        const signUpPassword = (document.getElementById('signUpPassword') as HTMLInputElement).value;
        const repeatPassword = (document.getElementById('repeatPassword') as HTMLInputElement).value;

        if (signUpPassword !== repeatPassword) {
            console.log("비밀번호가 일치하지 않습니다.");
            return;
        }

        await Signup(signUpEmail, signUpPassword);
    };

    const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = '/signin'; // Sign In 페이지로 이동
    };

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>SIGN UP</h1>
                <ul className={styles.links}>
                    <li className={styles.linkItem}>
                        <a href="/signin" id="signin" className={styles.linkAnchor} onClick={handleSignInClick}>SIGN IN</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href="/signup" id="signup" className={styles.linkAnchor} onClick={() => setIsSignUp(true)}>SIGN UP</a>
                    </li>
                </ul>
                <form className={styles.form}>
                    <div className={`${styles.inputBlock} ${styles.signupInputBlock}`}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                            id="signUpEmail"
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            id="signUpPassword"
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            className={styles.input}
                            id="repeatPassword"
                        />
                    </div>
                    <button
                        id="signUpButton"
                        className={styles.signinBtn}
                        type="submit"
                        onClick={handleSignUp}
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
