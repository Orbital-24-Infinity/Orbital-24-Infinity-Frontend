import React from "react";
import LoginButton from "../../components/firebase-auth/LoginButton";
import Image from "next/image";
import "../../styles/Login.sass";

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
