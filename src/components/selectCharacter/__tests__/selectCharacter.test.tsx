import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectCharacter } from '../selectCharacter';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

describe('SelectCharacter', () => {
  test('toggles the character in the store when clicked', async () => {
    const user = userEvent.setup();
    const item = { id: 1, title: 'Rick', description: 'Human | Alive' };
    const { store } = renderWithProviders(<SelectCharacter item={item} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select Rick' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(store.getState().selectedItems.items[1]).toEqual(item);
  });
});
