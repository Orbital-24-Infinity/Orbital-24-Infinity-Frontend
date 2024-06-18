"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";

const Logout = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        router.push("/login");
      } catch (error) {}
    };

    if (user) {
      handleLogout();
    }
  }, [router, user]);

  return <></>;
};

export default Logout;
