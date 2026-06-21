import Image from 'next/image';
import type { Character } from '../../api/richAndMorty';
import { Link } from '../../i18n/navigation';
import { SelectCharacter } from '../selectCharacter/selectCharacter';
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
        <div key={character.id} className={styles.row}>
          <SelectCharacter
            item={{
              id: character.id,
              title: character.name,
              description: `${character.species} | ${character.status}`,
            }}
          />
          <Link
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
            <Image
              src={character.image}
              alt={character.name}
              width={64}
              height={64}
              className={styles.avatar}
            />
            <div className={styles.text}>
              <h2 className={styles.name}>{character.name}</h2>
              <p className={styles.meta}>
                {character.species} | {character.status}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
