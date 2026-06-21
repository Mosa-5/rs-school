import { getTranslations } from 'next-intl/server';
import { getCharacter } from '../../lib/characters';
import { Link } from '../../i18n/navigation';
import styles from './characterDetails.module.css';

type CharacterDetailsProps = {
  id: string;
  query?: string;
  page: number;
};

export async function CharacterDetails({
  id,
  query,
  page,
}: CharacterDetailsProps) {
  const character = await getCharacter(id);
  const t = await getTranslations('Details');

  const closeHref = {
    pathname: '/' as const,
    query: { ...(query ? { q: query } : {}), page },
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <Link href={closeHref} className={styles.close} aria-label={t('close')}>
          ✕
        </Link>
      </div>

      {character ? (
        <dl className={styles.info}>
          <dt>{t('name')}</dt>
          <dd>{character.name}</dd>
          <dt>{t('species')}</dt>
          <dd>{character.species}</dd>
          <dt>{t('status')}</dt>
          <dd>{character.status}</dd>
        </dl>
      ) : (
        <p>{t('notFound')}</p>
      )}
    </div>
  );
}
