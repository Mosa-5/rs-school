import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const renderWithStore = (
  ui: ReactElement,
  store = setupStore()
) => ({
  store,
  ...render(<Provider store={store}>{ui}</Provider>),
});

describe('CardList', () => {
  test('shows fallback when 0 cards are provided', () => {
    renderWithStore(<CardList items={[]} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  test('renders provided cards', () => {
    renderWithStore(<CardList items={mockCardList} />);
    expect(screen.getAllByRole('heading')).toHaveLength(mockCardList.length);
  });

  test('checkbox selects an item without opening details', async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    const { store } = renderWithStore(
      <CardList items={mockCardList} onItemClick={onItemClick} />
    );

    await user.click(screen.getAllByRole('checkbox')[0]);

    expect(store.getState().selectedItems.items[1]).toBeTruthy();
    expect(onItemClick).not.toHaveBeenCalled();
  });

  test('clicking a card opens details without changing selection', async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    const { store } = renderWithStore(
      <CardList items={mockCardList} onItemClick={onItemClick} />
    );

    await user.click(screen.getByRole('heading', { name: 'Rick Sanchez' }));

    expect(onItemClick).toHaveBeenCalledWith(1);
    expect(store.getState().selectedItems.items).toEqual({});
  });
});
