import { Component } from 'react';
import Search from './components/search/search';
import CardList, { type CardItem } from './components/cardList/cardList';
import Loader from './components/loader/loader';
import BugButton from './components/bugButton/bugButton';
import { fetchCharacters } from './api/richAndMorty';
import './App.css';

const SEARCH_KEY = 'rs-school:lastSearch';

type AppState = {
  items: CardItem[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
};

class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    searchTerm: localStorage.getItem(SEARCH_KEY) ?? '',
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadCharacters(this.state.searchTerm);
  }

  componentDidUpdate(_: object, prevState: AppState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.loadCharacters(this.state.searchTerm);
    }
  }

  loadCharacters = async (rawTerm: string) => {
    const term = rawTerm.trim();
    this.setState({ loading: true, error: null });
    try {
      const data = await fetchCharacters({ search: term || undefined });
      this.setState({
        items: data.results.map((character) => ({
          id: character.id,
          title: character.name,
          description: `${character.species} • ${character.status}`,
        })),
      });
    } catch {
      this.setState({
        items: [],
        error: 'Could not load characters. Please try again.',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (rawTerm: string) => {
    const term = rawTerm.trim();
    localStorage.setItem(SEARCH_KEY, term);
    this.setState({ searchTerm: term });
  };

  renderResults() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <p className="error">{this.state.error}</p>;
    return <CardList items={this.state.items} />;
  }

  render() {
    return (
      <div className="app">
        <section className="controls">
          <Search
            initialValue={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
        </section>
        <section className="results">{this.renderResults()}</section>
        <BugButton />
      </div>
    );
  }
}

export default App;
