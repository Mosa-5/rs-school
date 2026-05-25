import { useEffect, useState, type MouseEvent } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import Search from '../components/search/search';
import CardList, { type CardItem } from '../components/cardList/cardList';
import Loader from '../components/loader/loader';
import BugButton from '../components/bugButton/bugButton';
import Pagination from '../components/pagination/pagination';
import { fetchCharacters } from '../api/richAndMorty';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Home.module.css';

const SEARCH_KEY = 'rs-school:lastSearch';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY, '');
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('page', '1');
          return next;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    let cancelled = false;
    const term = searchTerm.trim();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    fetchCharacters({ search: term || undefined, page })
      .then((data) => {
        if (cancelled) return;
        setItems(
          data.results.map((character) => ({
            id: character.id,
            title: character.name,
            description: `${character.species} | ${character.status}`,
          }))
        );
        setTotalPages(data.info?.pages ?? 1);
      })
      .catch(() => {
        if (cancelled) return;
        setItems([]);
        setError('Could not load characters. Please try again.');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchTerm, page]);

  const handleSearch = (rawTerm: string) => {
    setSearchTerm(rawTerm.trim());
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });
  };

  const handleItemClick = (id: number) => {
    navigate({
      pathname: `/details/${id}`,
      search: searchParams.toString(),
    });
  };

  const handleMainClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate({ pathname: '/', search: searchParams.toString() });
    }
  };

  const renderResults = () => {
    if (loading) return <Loader />;
    if (error) return <p className="error">{error}</p>;
    return <CardList items={items} onItemClick={handleItemClick} />;
  };

  const showPagination = !loading && !error && items.length > 0;

  return (
    <div className={styles.layout}>
      <div className={styles.main} onClick={handleMainClick}>
        <section className="controls">
          <Search initialValue={searchTerm} onSearch={handleSearch} />
        </section>
        <section className="results">{renderResults()}</section>
        {showPagination && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <BugButton />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
