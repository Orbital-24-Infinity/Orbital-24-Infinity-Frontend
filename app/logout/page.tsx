"use client";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await signOut(auth);
      router.push("/login");
    } catch (error) {}
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Logout;
