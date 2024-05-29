"use client";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);

  return <div>Welcome {user?.displayName}</div>;
};

export default Welcome;
