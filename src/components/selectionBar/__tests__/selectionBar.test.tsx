import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectionBar } from '../selectionBar';
import { toggleItem } from '../../../store/selectedItemsSlice';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

const rick = { id: 1, title: 'Rick', description: 'Human | Alive' };

describe('SelectionBar', () => {
  test('renders nothing when no items are selected', () => {
    renderWithProviders(<SelectionBar />);
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument();
  });

  test('shows the count, a download form and clears the selection', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<SelectionBar />);

    act(() => {
      store.dispatch(toggleItem(rick));
    });

    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    const downloadForm = screen
      .getByRole('button', { name: 'Download CSV' })
      .closest('form');
    expect(downloadForm).toHaveAttribute('action', '/api/csv');

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));
    expect(screen.queryByText('1 item selected')).not.toBeInTheDocument();
  });
});
