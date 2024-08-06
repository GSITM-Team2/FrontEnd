"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import Signin from './signIn';
import { useAuth } from '../../context/AuthContext';


const SigninPage: React.FC = () => {
    const { setIdToken } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();


    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signInEmail = (document.getElementById('signInEmail') as HTMLInputElement).value;
        const signInPassword = (document.getElementById('signInPassword') as HTMLInputElement).value
        try {
            const result = await Signin(signInEmail, signInPassword);
            if (result.success) {
                const user = result.user; // user 객체를 직접 사용해야한다
                const token = await user.getIdToken(); 
                setIdToken(token);
                router.push('/test');
                setErrorMessage('');
            }
        } catch (error: any) {
            console.error("로그인 오류:", error);
            setErrorMessage(error.error || "email / password를 확인해주세요.");
        }
    };


    const handleSignUpClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = '/signup'; // Sign Up 페이지로 이동
    };

    return (
        <div>
            <div className={styles.layout}>
            <div className={styles.container}>
                    <div className={styles.logoContainer}>
                <div className={styles.logoYear}>
                <div className={styles.yearBackground}>
                    <div className={styles.yearText}>2024</div>
                </div>
                </div>
                <div className={styles.logoText}>컬쳐랜드</div>
            </div>
                <div className={styles.intro}> 서울에 있는 모든 <b>행사 / 축제 / 공연</b><br></br>쉽게 찾아보기</div>
                <form className={styles.form} onSubmit={handleSignIn}>
                    <div className={styles.inputBlock}>
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
                    <div> {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}</div>
            
                    <button
                        id="signInButton"
                        className={styles.signinBtn}
                        type="submit"
                    >Sign in
                    </button>
                </form>
                <div className={styles.font2}> 아직 회원이 아니신가요?<b style={{paddingLeft: 30}} onClick={handleSignUpClick}>sign up</b>
                </div>
            </div>
            </div>
        </div>
    );
};

export default SigninPage;
