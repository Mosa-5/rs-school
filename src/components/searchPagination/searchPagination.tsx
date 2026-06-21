import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './searchPagination.module.css';

type SearchPaginationProps = {
  page: number;
  totalPages: number;
  query?: string;
};

export function SearchPagination({
  page,
  totalPages,
  query,
}: SearchPaginationProps) {
  const t = useTranslations('Search');
  const base = query ? { q: query } : {};

  return (
    <nav className={styles.pagination}>
      {page > 1 ? (
        <Link href={{ pathname: '/', query: { ...base, page: page - 1 } }}>
          {t('previous')}
        </Link>
      ) : (
        <span className={styles.disabled}>{t('previous')}</span>
      )}

      <span>{t('pageInfo', { page, total: totalPages })}</span>

      {page < totalPages ? (
        <Link href={{ pathname: '/', query: { ...base, page: page + 1 } }}>
          {t('next')}
        </Link>
      ) : (
        <span className={styles.disabled}>{t('next')}</span>
      )}
    </nav>
  );
}
