import reducer, {
  toggleItem,
  unselectAll,
  type CardItem,
} from '../selectedItemsSlice';

const rick: CardItem = { id: 1, title: 'Rick', description: 'Human | Alive' };
const morty: CardItem = { id: 2, title: 'Morty', description: 'Human | Alive' };

describe('selectedItemsSlice', () => {
  test('adds an item when toggled and not present', () => {
    const state = reducer(undefined, toggleItem(rick));
    expect(state.items[1]).toEqual(rick);
  });

  test('removes an item when toggled and already present', () => {
    const withRick = reducer(undefined, toggleItem(rick));
    const without = reducer(withRick, toggleItem(rick));
    expect(without.items[1]).toBeUndefined();
  });

  test('keeps multiple selected items', () => {
    let state = reducer(undefined, toggleItem(rick));
    state = reducer(state, toggleItem(morty));
    expect(Object.keys(state.items)).toHaveLength(2);
  });

  test('unselectAll clears everything', () => {
    let state = reducer(undefined, toggleItem(rick));
    state = reducer(state, toggleItem(morty));
    state = reducer(state, unselectAll());
    expect(Object.keys(state.items)).toHaveLength(0);
  });
});
