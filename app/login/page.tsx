import React from "react";
import prisma from "@/lib/prisma";
import LoginButton from "../firebase/LoginButton/LoginButton";

const Login = async () => {
  return (
    <div>
      <LoginButton />
    </div>
  );
};

export default Login;
