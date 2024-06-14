"use client";
import styles from "../Actions.module.sass";
import manageStyles from "./Manage.module.sass";

const handleClick = (e: any) => {
  console.log("Clicked");
};

const ManageButton = ({}) => {
  return (
    <button
      onClick={handleClick}
      className={`${styles.actionButtons} ${manageStyles.manageButton}`}
    >
      Manage
    </button>
  );
};

export default ManageButton;
