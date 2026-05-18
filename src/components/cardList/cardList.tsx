import Card from './card';
import styles from './cardList.module.css';

export type CardItem = {
  id: number;
  title: string;
  description: string;
};

type CardListProps = {
  items: CardItem[];
};

function CardList({ items }: CardListProps) {
  if (items.length === 0) {
    return <p className={styles.noResults}>No results.</p>;
  }
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default CardList;
