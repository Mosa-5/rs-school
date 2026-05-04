import './App.css';
import { Component } from 'react';
import Search from './components/search';
import CardList from './components/cardList/cardList';

 class App extends Component {

  state = { items: [] };

    render() {
      return (
        <div className="app">
          <section className="controls">
            <Search/>
          </section>
          <section className="results">
            <CardList items={this.state.items} />
          </section>
        </div>
      );
    }
  }

export default App;
