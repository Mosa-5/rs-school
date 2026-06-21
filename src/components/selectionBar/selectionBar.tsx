'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selectedItemsSlice';
import styles from './selectionBar.module.css';

export function SelectionBar() {
  const t = useTranslations('Selection');
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedItems.items);
  const selected = Object.values(items);

  if (selected.length === 0) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <span>{t('selected', { count: selected.length })}</span>
      <div className={styles.actions}>
        <button type="button" onClick={() => dispatch(unselectAll())}>
          {t('unselectAll')}
        </button>
        <form action="/api/csv" method="post">
          <input type="hidden" name="items" value={JSON.stringify(selected)} />
          <button type="submit">{t('download')}</button>
        </form>
      </div>
    </div>
  );
}
