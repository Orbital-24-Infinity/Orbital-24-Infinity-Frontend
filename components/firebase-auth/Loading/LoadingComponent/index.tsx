import styles from "./LoadingComponent.module.sass";

const LoadingComponent = () => {
  return (
    // Credits to https://loading.io/css/
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingComponent;
