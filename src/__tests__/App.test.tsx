import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../routes/Home';
import Details from '../routes/Details';
import About from '../routes/About';
import NotFound from '../routes/NotFound';
import {
  fetchCharacter,
  fetchCharacters,
  type Character,
} from '../api/richAndMorty';

jest.mock('../api/richAndMorty');

const mockedFetch = fetchCharacters as jest.Mock;
const mockedFetchCharacter = fetchCharacter as jest.Mock;

const SEARCH_KEY = 'rs-school:lastSearch';

const character = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  ...overrides,
});

const okResponse = (results: Character[] = [], pages = 1) => ({
  info: { count: results.length, pages },
  results,
});

const renderApp = () =>
  render(
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
  );

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedFetch.mockReset();
    mockedFetchCharacter.mockReset();
  });

  test('fetches with no search on mount when localStorage is empty', async () => {
    mockedFetch.mockResolvedValue(okResponse());

    renderApp();

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith({
        search: undefined,
        page: 1,
      });
    });
  });

  test('uses saved localStorage term on mount', async () => {
    localStorage.setItem(SEARCH_KEY, 'morty');
    mockedFetch.mockResolvedValue(okResponse());

    renderApp();

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith({
        search: 'morty',
        page: 1,
      });
    });
  });

  test('shows loader during fetch and cards on success', async () => {
    mockedFetch.mockResolvedValue(
      okResponse([character({ id: 1, name: 'Rick Sanchez' })])
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
    mockedFetch.mockRejectedValue(new Error('boom'));

    renderApp();

    expect(
      await screen.findByText(/could not load characters/i)
    ).toBeInTheDocument();
  });

  test('clicking Search re-fetches with new term and writes to localStorage', async () => {
    const user = userEvent.setup();
    mockedFetch.mockResolvedValue(okResponse());

    renderApp();

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });

    await user.type(screen.getByRole('textbox'), '  rick  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenLastCalledWith({
        search: 'rick',
        page: 1,
      });
    });
    expect(localStorage.getItem(SEARCH_KEY)).toBe('rick');
  });

  test('clicking a card opens the details panel', async () => {
    const user = userEvent.setup();
    mockedFetch.mockResolvedValue(
      okResponse([character({ id: 42, name: 'Rick Sanchez' })])
    );
    mockedFetchCharacter.mockResolvedValue(character({ id: 42 }));

    renderApp();

    const cardHeading = await screen.findByRole('heading', {
      name: 'Rick Sanchez',
    });
    await user.click(cardHeading);

    await waitFor(() => {
      expect(mockedFetchCharacter).toHaveBeenCalledWith('42');
    });

    expect(
      await screen.findByRole('button', { name: 'Close' })
    ).toBeInTheDocument();
  });
});
