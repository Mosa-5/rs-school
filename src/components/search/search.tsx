import { useState, type ChangeEvent } from 'react';
import styles from './search.module.css';

type SearchProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

function Search({ initialValue, onSearch }: SearchProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    onSearch(value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
