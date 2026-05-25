import { Link, Outlet } from 'react-router-dom';
import Flyout from './components/flyout/flyout';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
      <Flyout />
    </div>
  );
}

export default App;
