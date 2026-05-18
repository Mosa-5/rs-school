import { useState } from 'react';
import styles from './bugButton.module.css';

function BugButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error triggered by user.');
  }

  return (
    <button
      type="button"
      className={styles.bugButton}
      onClick={() => setShouldThrow(true)}
    >
      Throw error
    </button>
  );
}

export default BugButton;
