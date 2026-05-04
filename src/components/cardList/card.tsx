import { Component } from 'react';
import styles from './card.module.css';

type CardProps = {
  title: string;
  description: string;
}

class Card extends Component<CardProps> {
  render() {
    
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{this.props.title}</h2>
            <p className={styles.description}>{this.props.description}</p>
        </div>
    );
  }
}

export default Card;