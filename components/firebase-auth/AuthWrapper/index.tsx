"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";

import LoadingIcon from "../Loading";

interface AuthProps {
  children: React.ReactNode;
  toRedirect?: boolean;
  redirectPath?: string;
  isLoginPage?: boolean;
}

const AuthWrapper = ({
  children,
  toRedirect = false,
  redirectPath = "/",
  isLoginPage = false,
}: AuthProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [checkExpiredAuth, setCheckExpiredAuth] = useState<{
    loading: boolean;
    valid: boolean;
  }>({ loading: true, valid: false });
  const router = useRouter();

  useEffect(() => {
    const checkExpiredRequest = async () => {
      await fetch("/api/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
        }),
      }).then(async (res) => {
        const resJSON: { valid: boolean } = await res.json();
        const valid: boolean = resJSON.valid;
        setCheckExpiredAuth((prev) => {
          return { valid: valid, loading: false };
        });
        if (valid && toRedirect) {
          router.push(redirectPath);
        }
      });
    };
    setCheckExpiredAuth((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    if (!loading) {
      checkExpiredRequest();
    }
  }, [user, loading, router, toRedirect, redirectPath]);

  return loading || checkExpiredAuth.loading ? (
    <LoadingIcon />
  ) : ((error || !user) && !toRedirect) ||
    (!checkExpiredAuth.loading && !checkExpiredAuth.valid && !isLoginPage) ? (
    redirect("/login")
  ) : toRedirect && checkExpiredAuth.valid ? (
    redirect(redirectPath)
  ) : (
    children
  );
};

export default AuthWrapper;
