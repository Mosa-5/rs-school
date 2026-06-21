import type { Character } from '../../api/richAndMorty';
import { Link } from '../../i18n/navigation';
import styles from './characterList.module.css';

type CharacterListProps = {
  characters: Character[];
  query?: string;
  page: number;
};

export function CharacterList({ characters, query, page }: CharacterListProps) {
  return (
    <div className={styles.list}>
      {characters.map((character) => (
        <Link
          key={character.id}
          href={{
            pathname: '/',
            query: {
              ...(query ? { q: query } : {}),
              page,
              details: character.id,
            },
          }}
          className={styles.card}
        >
          <h2 className={styles.name}>{character.name}</h2>
          <p className={styles.meta}>
            {character.species} | {character.status}
          </p>
        </Link>
      ))}
    </div>
  );
}
