'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem, type CardItem } from '../../store/selectedItemsSlice';

export function SelectCharacter({ item }: { item: CardItem }) {
  const t = useTranslations('Selection');
  const dispatch = useAppDispatch();
  const checked = useAppSelector((state) =>
    Boolean(state.selectedItems.items[item.id])
  );

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => dispatch(toggleItem(item))}
      aria-label={t('select', { name: item.title })}
    />
  );
}
