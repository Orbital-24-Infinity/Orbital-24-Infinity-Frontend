import React from "react";
import prisma from "@/lib/prisma";
import LoginButton from "../firebase/LoginButton/LoginButton";
import Heading from "./Heading";
import Authenticate from "./Authenticate";

const Login = async () => {
  return (
    <>
      <div style={{
               position: 'absolute',
               left: '50%',
               top: '40%',
               transform: 'translate(-50%, -50%)'}}>
      <Heading />
      </div>
      <div style={{
               position: 'absolute',
               left: '50%',
               top: '60%',
               transform: 'translate(-50%, -50%)'}}>
        <button onClick={LoginButton}>
        <Authenticate />
        </button>
        {/* <LoginButton /> */}
      </div>
    </>
  );
};

export default Login;
