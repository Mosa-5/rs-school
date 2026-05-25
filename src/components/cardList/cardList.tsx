import Card from './card';
import styles from './cardList.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedItemsSlice';

export type CardItem = {
  id: number;
  title: string;
  description: string;
};

type CardListProps = {
  items: CardItem[];
  onItemClick?: (id: number) => void;
};

function CardList({ items, onItemClick }: CardListProps) {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  if (items.length === 0) {
    return <p className={styles.noResults}>No results.</p>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={Boolean(selectedItems[item.id])}
            onChange={() => dispatch(toggleItem(item))}
            aria-label={`Select ${item.title}`}
          />
          {onItemClick ? (
            <div
              className={styles.cardButton}
              role="button"
              tabIndex={0}
              onClick={() => onItemClick(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onItemClick(item.id);
                }
              }}
            >
              <Card title={item.title} description={item.description} />
            </div>
          ) : (
            <Card title={item.title} description={item.description} />
          )}
        </div>
      ))}
    </div>
  );
}

export default CardList;
