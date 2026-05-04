import { Component, type ReactNode } from "react";
import styles from './search.module.css';
class Search extends Component {
render(): ReactNode {
    return (
        <div className={styles.search}>
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
}
}

export default Search;