"use client";
import React from "react";

interface LoginButtonProps {
  handleLogin: () => void;
}

const LoginButton = (props: LoginButtonProps) => {
  return <button onClick={props.handleLogin}>Login</button>;
};

export default LoginButton;
