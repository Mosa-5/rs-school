import { useEffect, useState } from 'react';
import Search from './components/search/search';
import CardList, { type CardItem } from './components/cardList/cardList';
import Loader from './components/loader/loader';
import BugButton from './components/bugButton/bugButton';
import { fetchCharacters } from './api/richAndMorty';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

const SEARCH_KEY = 'rs-school:lastSearch';

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY, '');
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const term = searchTerm.trim();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);

    fetchCharacters({ search: term || undefined })
      .then((data) => {
        if (cancelled) return;
        setItems(
          data.results.map((character) => ({
            id: character.id,
            title: character.name,
            description: `${character.species} | ${character.status}`,
          }))
        );
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
  }, [searchTerm]);

  const handleSearch = (rawTerm: string) => {
    setSearchTerm(rawTerm.trim());
  };

  const renderResults = () => {
    if (loading) return <Loader />;
    if (error) return <p className="error">{error}</p>;
    return <CardList items={items} />;
  };

  return (
    <div className="app">
      <section className="controls">
        <Search initialValue={searchTerm} onSearch={handleSearch} />
      </section>
      <section className="results">{renderResults()}</section>
      <BugButton />
    </div>
  );
}

export default App;
