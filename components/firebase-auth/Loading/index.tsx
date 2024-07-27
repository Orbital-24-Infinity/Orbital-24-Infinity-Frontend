import React from "react";

import styles from "./Loading.module.sass";
import LoadingComponent from "./LoadingComponent";

const LoadingIcon = () => {
  return (
    <div className={styles.loadingIcon}>
      <LoadingComponent />
    </div>
  );
};

export default LoadingIcon;
