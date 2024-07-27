"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { auth } from "../../../app/firebase/config";
import styles from "./LoginButton.module.sass";

const LoginButton = () => {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      // typing this instead of any type is way too troublesome, i can't be bothered
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      router.push("/dashboard");
    } catch (error) {
      return;
    }
  };

  return (
    <button onClick={handleLogin} className={styles.loginButton}>
      <Image
        src="/Google-Sign-In.png"
        alt="login-google-logo"
        width={700}
        height={160}
      />
    </button>
  );
};

export default LoginButton;
