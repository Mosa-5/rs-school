import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selectedItemsSlice';
import styles from './flyout.module.css';

function Flyout() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedItems.items);
  const count = Object.keys(items).length;

  if (count === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <span>
        {count} {count === 1 ? 'item' : 'items'} selected
      </span>
      <div className={styles.actions}>
        <button type="button" onClick={() => dispatch(unselectAll())}>
          Unselect all
        </button>
        <button type="button">Download</button>
      </div>
    </div>
  );
}

export default Flyout;
