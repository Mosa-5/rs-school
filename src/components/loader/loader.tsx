import styles from './loader.module.css';

function Loader() {
  return (
    <div className={styles.loader} role="status" aria-label="Loading">
      <div className={styles.spinner} />
    </div>
  );
}

export default Loader;
