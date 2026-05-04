import { Component, type ChangeEvent, type ReactNode } from 'react';
import styles from './search.module.css';

type SearchProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

type SearchState = {
  value: string;
};

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    value: this.props.initialValue,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.value);
  };

  render(): ReactNode {
    return (
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
