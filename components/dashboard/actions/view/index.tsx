"use client";
import styles from "../Actions.module.sass";
import viewStyles from "./View.module.sass";

const handleClick = (e: any) => {
  console.log("Clicked");
};

const ViewButton = ({}) => {
  return (
    <button
      onClick={handleClick}
      className={`${styles.actionButtons} ${viewStyles.viewButton}`}
    >
      View
    </button>
  );
};

export default ViewButton;
