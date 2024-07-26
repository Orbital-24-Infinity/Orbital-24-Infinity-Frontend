"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const [toImmediatelyRedirect, setToImmediatelyRedirect] = useState(false);
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
        if (valid && toRedirect && user) {
          setToImmediatelyRedirect(true);
        }
      });
    };
    if (!loading) {
      // setCheckExpiredAuth((prev) => {
      //   return {
      //     ...prev,
      //     loading: true,
      //   };
      // });
      checkExpiredRequest();
    }
  }, [user, loading, router, toRedirect, redirectPath]);

  useEffect(() => {
    if (toImmediatelyRedirect) {
      router.push(redirectPath);
    }
  }, [toImmediatelyRedirect, router, redirectPath]);

  // useEffect(() => {
  //   console.log(user, loading, router, toRedirect, redirectPath);
  // }, [user, loading, router, toRedirect, redirectPath]);

  // useEffect(() => {
  //   console.log(
  //     loading,
  //     checkExpiredAuth.loading,
  //     (error || !user) && !toRedirect,
  //     !checkExpiredAuth.loading && !checkExpiredAuth.valid && !isLoginPage
  //   );
  //   console.log(
  //     loading || checkExpiredAuth.loading
  //       ? "a"
  //       : ((error || !user) && !toRedirect) ||
  //           (!checkExpiredAuth.loading &&
  //             !checkExpiredAuth.valid &&
  //             !isLoginPage)
  //         ? "b"
  //         : toRedirect && checkExpiredAuth.valid
  //           ? "c"
  //           : "d"
  //   );
  // }, [checkExpiredAuth, error, isLoginPage, loading, toRedirect, user]);

  return loading || checkExpiredAuth.loading ? (
    <LoadingIcon />
  ) : ((error || !user) && !toRedirect) ||
    (!checkExpiredAuth.loading && !checkExpiredAuth.valid && !isLoginPage) ? (
    redirect("/login")
  ) : user?.email && toRedirect && checkExpiredAuth.valid ? (
    redirect(redirectPath)
  ) : (
    children
  );
};

export default AuthWrapper;
