"use client";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";

import { auth } from "@/app/firebase/config";

import AuthWrapper from "../AuthWrapper";
import styles from "./LoginButton.module.sass";

const LoginButton = () => {
  const googleAuth = new GoogleAuthProvider();
  const defaultRedirectPath = "/dashboard";

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      fetch("/api/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
    } catch (error) {
      return;
    }
  };

  return (
    <AuthWrapper toRedirect redirectPath={defaultRedirectPath}>
      <button onClick={handleLogin} className={styles.loginButton}>
        <Image
          src="/Google-Sign-In.png"
          alt="login-google-logo"
          width={700}
          height={160}
        />
      </button>
    </AuthWrapper>
  );
};

export default LoginButton;
