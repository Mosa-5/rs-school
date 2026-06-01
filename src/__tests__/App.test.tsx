import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '../context/ThemeProvider';
import App from '../App';
import Home from '../routes/Home';
import Details from '../routes/Details';
import About from '../routes/About';
import NotFound from '../routes/NotFound';
import { setupStore } from '../store/store';
import {
  charactersResponse,
  installFetchMock,
  lastFetchUrl,
  makeCharacter,
} from '../test-utils/fetchMock';
import type { Character } from '../api/richAndMorty';

const SEARCH_KEY = 'rs-school:lastSearch';

const listAndDetailHandler =
  (listResults: Character[] = [makeCharacter()], pages = 1) =>
  (url: string) => {
    const single = url.match(/\/character\/(\d+)/);
    if (single) {
      return { body: makeCharacter({ id: Number(single[1]) }) };
    }
    return { body: charactersResponse(listResults, pages) };
  };

const renderApp = () =>
  render(
    <Provider store={setupStore()}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<Home />}>
                <Route index element={null} />
                <Route path="details/:detailsId" element={<Details />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('App', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('fetches with no search on mount when localStorage is empty', async () => {
    const fetchMock = installFetchMock(listAndDetailHandler([]));

    renderApp();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const url = new URL(lastFetchUrl(fetchMock));
    expect(url.pathname).toBe('/api/character');
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.has('name')).toBe(false);
  });

  test('uses saved localStorage term on mount', async () => {
    localStorage.setItem(SEARCH_KEY, 'morty');
    const fetchMock = installFetchMock(listAndDetailHandler([]));

    renderApp();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const url = new URL(lastFetchUrl(fetchMock));
    expect(url.searchParams.get('name')).toBe('morty');
    expect(url.searchParams.get('page')).toBe('1');
  });

  test('shows loader during fetch and cards on success', async () => {
    installFetchMock(
      listAndDetailHandler([makeCharacter({ id: 1, name: 'Rick Sanchez' })])
    );

    renderApp();

    expect(
      screen.getByRole('status', { name: 'Loading' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: 'Rick Sanchez' })
    ).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    installFetchMock(() => ({ status: 500, body: {} }));

    renderApp();

    expect(
      await screen.findByText(/could not load characters/i)
    ).toBeInTheDocument();
  });

  test('clicking Search re-fetches with new term and writes to localStorage', async () => {
    const user = userEvent.setup();
    const fetchMock = installFetchMock(listAndDetailHandler([]));

    renderApp();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    await user.type(screen.getByRole('textbox'), '  rick  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      const url = new URL(lastFetchUrl(fetchMock));
      expect(url.searchParams.get('name')).toBe('rick');
    });
    expect(localStorage.getItem(SEARCH_KEY)).toBe('rick');
  });

  test('clicking a card opens the details panel', async () => {
    const user = userEvent.setup();
    installFetchMock(
      listAndDetailHandler([makeCharacter({ id: 42, name: 'Rick Sanchez' })])
    );

    renderApp();

    const cardHeading = await screen.findByRole('heading', {
      name: 'Rick Sanchez',
    });
    await user.click(cardHeading);

    expect(
      await screen.findByRole('button', { name: 'Close' })
    ).toBeInTheDocument();
  });
});
