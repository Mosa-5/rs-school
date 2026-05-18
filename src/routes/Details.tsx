import { useEffect, useState, type MouseEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from '../components/loader/loader';
import { fetchCharacter, type Character } from '../api/richAndMorty';
import styles from './Details.module.css';

function Details() {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);

    fetchCharacter(detailsId)
      .then((data) => {
        if (!cancelled) setCharacter(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load character.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [detailsId]);

  const handleClose = () => {
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  const handlePanelClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <aside className={styles.details} onClick={handlePanelClick}>
      <button type="button" onClick={handleClose} className={styles.close}>
        Close
      </button>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {character && !loading && !error && (
        <div>
          <h2>{character.name}</h2>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
        </div>
      )}
    </aside>
  );
}

export default Details;
