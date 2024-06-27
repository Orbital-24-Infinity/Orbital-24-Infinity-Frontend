"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import LoadingIcon from "@/components/firebase-auth/Loading";

const Logout = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
      } catch (error) {
      } finally {
        router.push("/login");
      }
    };

    if (user) {
      handleLogout();
    } else if (!loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return <LoadingIcon />;
};

export default Logout;
