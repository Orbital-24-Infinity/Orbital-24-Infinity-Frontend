"use client";
import React from "react";
import LoginButton from "../firebase/LoginButton/LoginButton";
import { auth } from "@/app/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthWrapper from "../firebase/AuthWrapper/AuthWrapper";

const Login = () => {
  const googleAuth = new GoogleAuthProvider();
  const defaultRedirectPath = "/dashboard";

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
    } catch (error) {
      return;
    }
  };

  return (
    <AuthWrapper toRedirect redirectPath={defaultRedirectPath}>
      <LoginButton handleLogin={handleLogin} />
    </AuthWrapper>
  );
};

export default Login;
