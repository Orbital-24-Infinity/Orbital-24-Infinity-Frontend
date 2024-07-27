"use client";
import Link from "next/link";
import React from "react";

import styles from "../Actions.module.sass";
import viewStyles from "./View.module.sass";

// const handleClick = (e: any) => {
//   console.log("Clicked");
// };

interface ViewButtonProps {
  id: number;
}

const ViewButton = ({ id }: ViewButtonProps) => {
  return (
    <Link href={`/topic/${id}`} data-testid={`View-${id}`}>
      <button
        // onClick={handleClick}
        className={`${styles.actionButtons} ${viewStyles.viewButton}`}
      >
        View
      </button>
    </Link>
  );
};

export default ViewButton;
