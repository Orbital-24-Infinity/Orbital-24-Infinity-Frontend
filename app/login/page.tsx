import "../../styles/Login.sass";

import Image from "next/image";
import React from "react";

import LoginButton from "../../components/firebase-auth/LoginButton";

const Login = async () => {
  return (
    <div className="loginComponent">
      <Image
        src="/Project Infinity.png"
        alt="login-logo"
        width={1144}
        height={312}
        className="loginBtn"
      />
      <LoginButton />
    </div>
  );
};

export default Login;
