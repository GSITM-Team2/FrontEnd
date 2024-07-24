"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Signin from "./signIn";
import seoulIllor from "../../../public/img/seoul.png";
import Image from "next/image";

const SigninPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInEmail = (
      document.getElementById("signInEmail") as HTMLInputElement
    ).value;
    const signInPassword = (
      document.getElementById("signInPassword") as HTMLInputElement
    ).value;

    try {
      await Signin(signInEmail, signInPassword);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("아이디/비밀번호를 확인해주세요");
    }
  };

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    window.location.href = "/signup"; // Sign Up 페이지로 이동
  };

  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div>
            <Image src={seoulIllor} alt="" width={100} height={50} />
          </div>
          <h1 className={styles.title}>CULTURE LAND</h1>
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
            <div>
              {" "}
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
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
              // onClick={handleSignIn}
            >
              Sign in
            </button>
          </form>
          <div className={styles.font2}>
            {" "}
            아직 회원이 아니신가요?
            <b style={{ paddingLeft: 30 }} onClick={handleSignUpClick}>
              sign up
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
