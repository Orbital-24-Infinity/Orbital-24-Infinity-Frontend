import "../../styles/Login.sass";

import Image from "next/image";
import React from "react";

import AuthWrapper from "@/components/firebase-auth/AuthWrapper";

import LoginButton from "../../components/firebase-auth/LoginButton";

const Login = () => {
  const defaultRedirectPath = "/dashboard";

  return (
    <AuthWrapper toRedirect isLoginPage redirectPath={defaultRedirectPath}>
      <div className="loginComponent">
        <Image
          src="/Project Infinity.png"
          alt="login-logo"
          width={1144}
          height={312}
          className="loginLogo"
        />
        <LoginButton />
      </div>
    </AuthWrapper>
  );
};

export default Login;
