"use client";
import styles from "../Actions.module.sass";
import generateStyles from "./Generate.module.sass";

const handleClick = (e: any) => {
  console.log("Clicked");
};

const GenerateButton = ({}) => {
  return (
    <button
      onClick={handleClick}
      className={`${styles.actionButtons} ${generateStyles.generateButton}`}
    >
      Generate More
    </button>
  );
};

export default GenerateButton;
