import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className={styles.link}>
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
