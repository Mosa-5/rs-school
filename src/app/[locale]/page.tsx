import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getCharacters } from '../../lib/characters';
import { CharacterList } from '../../components/characterList/characterList';
import { SearchPagination } from '../../components/searchPagination/searchPagination';
import styles from './page.module.css';

type HomePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string; details?: string }>;
};

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { q, page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const search = q?.trim() || undefined;

  const data = await getCharacters({ search, page });
  const characters = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  const t = await getTranslations('Search');

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <form className={styles.searchForm} method="get">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ''}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            className={styles.searchInput}
          />
          <button type="submit">{t('submit')}</button>
        </form>

        <section className="results">
          {characters.length === 0 ? (
            <p className={styles.noResults}>{t('noResults')}</p>
          ) : (
            <CharacterList characters={characters} query={search} page={page} />
          )}
        </section>

        {characters.length > 0 && (
          <SearchPagination
            page={page}
            totalPages={totalPages}
            query={search}
          />
        )}
      </div>

      <aside className={styles.detailsPanel} />
    </div>
  );
}
