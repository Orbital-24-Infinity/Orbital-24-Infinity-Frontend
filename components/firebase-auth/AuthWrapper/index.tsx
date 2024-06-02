"use client";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";

interface AuthProps {
  children: React.ReactNode;
  toRedirect?: boolean;
  redirectPath?: string;
}

const AuthWrapper = ({
  children,
  toRedirect = false,
  redirectPath = "/",
}: AuthProps) => {
  
  const [user, loading, error] = useAuthState(auth);
  const userLoggedIn = user?.email;

  return loading
    ? children
    : (error || !userLoggedIn) && !toRedirect
      ? redirect("/login")
      : toRedirect && userLoggedIn
        ? redirect(redirectPath)
        : children;
};

export default AuthWrapper;
