import { render, screen } from '@testing-library/react';
import CardList, { type CardItem } from '../cardList';

const mockCardList: CardItem[] = [
  {
    title: 'Rick Sanchez',
    description: 'Human | Alive',
    id: 1,
  },
  {
    title: 'Morty Smith',
    description: 'Human | Alive',
    id: 2,
  },
];

describe('CardList', () => {
  test('shows fallback when 0 cards are provided', () => {
    render(<CardList items={[]} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  test('renders provided cards', () => {
    render(<CardList items={mockCardList} />);
    expect(screen.getAllByRole('heading')).toHaveLength(mockCardList.length);
  });
});
