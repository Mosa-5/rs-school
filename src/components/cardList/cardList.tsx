import Card from './card';
import styles from './cardList.module.css';

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
  if (items.length === 0) {
    return <p className={styles.noResults}>No results.</p>;
  }
  return (
    <div className={styles.list}>
      {items.map((item) =>
        onItemClick ? (
          <button
            key={item.id}
            type="button"
            className={styles.cardButton}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(item.id);
            }}
          >
            <Card title={item.title} description={item.description} />
          </button>
        ) : (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
          />
        )
      )}
    </div>
  );
}

export default CardList;
