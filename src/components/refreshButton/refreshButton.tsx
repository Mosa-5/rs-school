import { useAppDispatch } from '../../store/hooks';
import { apiSlice } from '../../store/apiSlice';
import styles from './refreshButton.module.css';

function RefreshButton() {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(apiSlice.util.invalidateTags(['Characters', 'Character']));
  };

  return (
    <button
      type="button"
      className={styles.refreshButton}
      onClick={handleRefresh}
    >
      Refresh
    </button>
  );
}

export default RefreshButton;
