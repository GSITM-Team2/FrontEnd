'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import signin from './signIn';

const SigninPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const signInEmail = (document.getElementById('signInEmail') as HTMLInputElement).value;
        const signInPassword = (document.getElementById('signInPassword') as HTMLInputElement).value;
        await signin(signInEmail, signInPassword);
    };

    const handleSignUpClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = '/signup'; // Sign Up 페이지로 이동
    };

    const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        setIsSignUp(false);
    };

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
                <ul className={styles.links}>
                    <li className={styles.linkItem}>
                        <a href="/signin" id="signin" className={styles.linkAnchor} onClick={handleSignInClick}>SIGN IN</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href="/signup" id="signup" className={styles.linkAnchor} onClick={handleSignUpClick}>SIGN UP</a>
                    </li>
                </ul>
                <form className={styles.form}>
                    <div className={`${styles.inputBlock} ${isSignUp ? styles.signupInputBlock : styles.firstInputBlock}`}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                            id="signInEmail"
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            id="signInPassword"
                        />
                    </div>
                    {isSignUp && (
                        <div className={styles.inputBlock}>
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                className={styles.input}
                                id="repeatPassword"
                            />
                        </div>
                    )}
                    <button
                        id="signInButton"
                        className={styles.signinBtn}
                        type="submit"
                        onClick={handleSignIn}
                    >
                        {isSignUp ? 'Sign up' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SigninPage;
