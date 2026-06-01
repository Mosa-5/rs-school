import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Details from '../Details';
import { setupStore } from '../../store/store';
import { installFetchMock, makeCharacter } from '../../test-utils/fetchMock';

const renderWithRoute = (initialEntry: string) =>
  render(
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/details/:detailsId" element={<Details />} />
          <Route path="/" element={<div>Home page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe('Details', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows loader while fetching, then character info on success', async () => {
    installFetchMock(() => ({ body: makeCharacter({ id: 42 }) }));

    renderWithRoute('/details/42');

    expect(
      screen.getByRole('status', { name: 'Loading' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: 'Rick Sanchez' })
    ).toBeInTheDocument();

    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    installFetchMock(() => ({ status: 500, body: {} }));

    renderWithRoute('/details/42');

    expect(
      await screen.findByText(/could not load character/i)
    ).toBeInTheDocument();
  });

  test('Close button navigates back to home', async () => {
    const user = userEvent.setup();
    installFetchMock(() => ({ body: makeCharacter({ id: 42 }) }));

    renderWithRoute('/details/42');

    await screen.findByRole('heading', { name: 'Rick Sanchez' });
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
