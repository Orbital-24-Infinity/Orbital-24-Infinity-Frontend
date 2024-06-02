"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import LogoutButton from "../../components/firebase-auth/LogoutButton";
import styles from "./Navbar.module.sass";

interface NavbarProps {
  children?: React.ReactNode;
}

const NavbarComponent = ({ children }: NavbarProps) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <div className={styles.navbar}>
        <div>{user?.displayName}</div>
        <LogoutButton />
      </div>
      {children ?? children}
    </div>
  );
};

export default NavbarComponent;
