import { Component } from 'react';
import Search from './components/search';
import CardList, { type CardItem } from './components/cardList/cardList';
import { fetchCharacters } from './api/richAndMorty';
import './App.css';

const SEARCH_KEY = 'rs-school:lastSearch';

type AppState = {
  items: CardItem[];
  searchTerm: string;
};

class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    searchTerm: localStorage.getItem(SEARCH_KEY) ?? '',
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
    try {
      const data = await fetchCharacters({ search: term || undefined });
      this.setState({
        items: data.results.map((character) => ({
          id: character.id,
          title: character.name,
          description: `${character.species} • ${character.status}`,
        })),
      });
    } catch (err) {
      console.error(err);
      this.setState({ items: [] });
    }
  };

  handleSearch = (rawTerm: string) => {
    const term = rawTerm.trim();
    localStorage.setItem(SEARCH_KEY, term);
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <div className="app">
        <section className="controls">
          <Search
            initialValue={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
        </section>
        <section className="results">
          <CardList items={this.state.items} />
        </section>
      </div>
    );
  }
}

export default App;
