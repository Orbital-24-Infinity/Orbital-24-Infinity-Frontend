"use client";
import React from "react";
import { auth } from "@/app/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthWrapper from "../AuthWrapper/AuthWrapper";

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
      <button onClick={handleLogin}>Login</button>
    </AuthWrapper>
  );
};

export default LoginButton;
