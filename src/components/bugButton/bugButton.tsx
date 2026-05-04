import { Component } from 'react';
import styles from './bugButton.module.css';

type State = { shouldThrow: boolean };

class BugButton extends Component<object, State> {
  state: State = { shouldThrow: false };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered by user.');
    }
    return (
      <button
        type="button"
        className={styles.bugButton}
        onClick={this.handleClick}
      >
        Throw error
      </button>
    );
  }
}

export default BugButton;
