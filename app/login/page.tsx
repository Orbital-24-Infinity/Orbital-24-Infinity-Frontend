import React from "react";
import prisma from "@/lib/prisma";
import LoginButton from "../firebase/LoginButton/LoginButton";
import Heading from "./Heading";
import Authenticate from "./Authenticate";
import "./Style.css";

const Login = async () => {
  return (
    <>
      <div className="header">
        <Heading />
      </div>
      <div className="authenticateButton">
        <LoginButton />
      </div>
    </>
  );
};

export default Login;
