'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Signup from './signUp';
import seoulIllor from '../../../public/img/seoul.png'
import Image from 'next/image'
const SignupPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        console.log('Password Error:', passwordError);
    }, [passwordError]);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signUpEmail = (document.getElementById('signUpEmail') as HTMLInputElement).value;
        const signUpPassword = (document.getElementById('signUpPassword') as HTMLInputElement).value;
        const repeatPassword = (document.getElementById('repeatPassword') as HTMLInputElement).value;

        if (signUpPassword !== repeatPassword) {
            console.log('Setting password error');
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        console.log('Clearing password error');
        setPasswordError(''); 
        await Signup(signUpEmail, signUpPassword);
    };

    const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = '/signin';
    };

    return (
        <div>
            <div className={styles.layout}>
            <div className={styles.container}>
                <div>
                <Image
                    src={seoulIllor}
                    alt=''
                    width={120}
                    height={60}
                />
                </div>
                <h1 className={styles.title}>CULTURE LAND</h1>
                <div className={styles.intro}> 서울에 있는 모든 <b>행사 / 축제 / 공연</b><br></br>쉽게 찾아보기</div>
                <form className={styles.form} onSubmit={handleSignUp}>
                    <div className={styles.inputBlock}>
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
                    {passwordError && (
                        <div className={styles.errorMessage}>
                            {passwordError}
                        </div>
                    )}
                    <button
                        id="signUpButton"
                        className={styles.signinBtn}
                        type="submit"
                    >Sign up
                    </button>
                </form>
                <div className={styles.font2}><b onClick={handleSignInClick}>sign in</b>
                </div>
            </div>
            </div>
        </div>
    );
};

export default SignupPage;
