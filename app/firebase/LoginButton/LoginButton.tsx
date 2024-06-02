"use client";
import React from "react";
import { auth } from "@/app/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Image from "next/image";

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
      <button onClick={handleLogin}>
        <Image src="/images/web_dark_rd_SI@4x.png" width={150} height={45} alt="google button" />
      </button>
    </AuthWrapper>
  );
};

export default LoginButton;
