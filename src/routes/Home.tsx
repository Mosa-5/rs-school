import { useEffect, type MouseEvent } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import Search from '../components/search/search';
import CardList from '../components/cardList/cardList';
import Loader from '../components/loader/loader';
import BugButton from '../components/bugButton/bugButton';
import Pagination from '../components/pagination/pagination';
import { useGetCharactersQuery } from '../store/apiSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Home.module.css';

const SEARCH_KEY = 'rs-school:lastSearch';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY, '');

  const page = Number(searchParams.get('page')) || 1;
  const term = searchTerm.trim();

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

  const { data, isFetching, isError } = useGetCharactersQuery({
    search: term || undefined,
    page,
  });

  const items = data
    ? data.results.map((character) => ({
        id: character.id,
        title: character.name,
        description: `${character.species} | ${character.status}`,
      }))
    : [];
  const totalPages = data?.info?.pages ?? 1;

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
    if (isFetching) return <Loader />;
    if (isError) {
      return (
        <p className="error">Could not load characters. Please try again.</p>
      );
    }
    return <CardList items={items} onItemClick={handleItemClick} />;
  };

  const showPagination = !isFetching && !isError && items.length > 0;

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
