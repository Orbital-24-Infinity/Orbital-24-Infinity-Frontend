"use client";
import "../../../styles/Logout.sass";

import Link from "next/link";

const LogoutButton = () => {
  return (
    <Link href={"/logout"} className="logoutButton">
      Logout
    </Link>
  );
};

export default LogoutButton;
