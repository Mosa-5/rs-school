import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Flyout from '../flyout';
import { setupStore } from '../../../store/store';
import { toggleItem } from '../../../store/selectedItemsSlice';
import { downloadCsv } from '../../../utils/downloadCsv';
import type { CardItem } from '../../cardList/cardList';

jest.mock('../../../utils/downloadCsv', () => ({
  downloadCsv: jest.fn(),
}));

const mockedDownloadCsv = downloadCsv as jest.Mock;

const rick: CardItem = { id: 1, title: 'Rick', description: 'Human | Alive' };
const morty: CardItem = { id: 2, title: 'Morty', description: 'Human | Alive' };

describe('Flyout', () => {
  beforeEach(() => {
    mockedDownloadCsv.mockReset();
  });

  test('renders nothing when no items are selected', () => {
    const { container } = render(
      <Provider store={setupStore()}>
        <Flyout />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('shows the count of selected items', () => {
    const store = setupStore();
    store.dispatch(toggleItem(rick));
    store.dispatch(toggleItem(morty));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  test('Unselect all clears the selection', async () => {
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(toggleItem(rick));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));

    expect(store.getState().selectedItems.items).toEqual({});
  });

  test('Download triggers CSV generation with the selected items', async () => {
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(toggleItem(rick));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: 'Download' }));

    expect(mockedDownloadCsv).toHaveBeenCalledWith([rick]);
  });
});
