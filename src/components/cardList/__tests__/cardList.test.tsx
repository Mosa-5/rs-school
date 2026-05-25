import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { type ReactElement } from 'react';
import CardList, { type CardItem } from '../cardList';
import { setupStore } from '../../../store/store';

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

const renderWithStore = (ui: ReactElement) =>
  render(<Provider store={setupStore()}>{ui}</Provider>);

describe('CardList', () => {
  test('shows fallback when 0 cards are provided', () => {
    renderWithStore(<CardList items={[]} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  test('renders provided cards', () => {
    renderWithStore(<CardList items={mockCardList} />);
    expect(screen.getAllByRole('heading')).toHaveLength(mockCardList.length);
  });
});
