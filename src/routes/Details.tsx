import { type MouseEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from '../components/loader/loader';
import { useGetCharacterQuery } from '../store/apiSlice';
import styles from './Details.module.css';

function Details() {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: character,
    isFetching,
    isError,
  } = useGetCharacterQuery(detailsId ?? '', { skip: !detailsId });

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
      {isFetching && <Loader />}
      {isError && <p className="error">Could not load character.</p>}
      {character && !isFetching && !isError && (
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
