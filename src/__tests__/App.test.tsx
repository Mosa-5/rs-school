import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { fetchCharacters, type Character } from '../api/richAndMorty';

jest.mock('../api/richAndMorty');

const mockedFetch = fetchCharacters as jest.Mock;

const SEARCH_KEY = 'rs-school:lastSearch';

const character = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  ...overrides,
});

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedFetch.mockReset();
  });

  test('fetches with no search on mount when localStorage is empty', async () => {
    mockedFetch.mockResolvedValue({ results: [] });

    render(<App />);

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith({ search: undefined });
    });
  });

  test('uses saved localStorage term on mount', async () => {
    localStorage.setItem(SEARCH_KEY, 'morty');
    mockedFetch.mockResolvedValue({ results: [] });

    render(<App />);

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith({ search: 'morty' });
    });
  });

  test('shows loader during fetch and cards on success', async () => {
    mockedFetch.mockResolvedValue({
      results: [character({ id: 1, name: 'Rick Sanchez' })],
    });

    render(<App />);

    expect(
      screen.getByRole('status', { name: 'Loading' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: 'Rick Sanchez' })
    ).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    mockedFetch.mockRejectedValue(new Error('boom'));

    render(<App />);

    expect(
      await screen.findByText(/could not load characters/i)
    ).toBeInTheDocument();
  });

  test('clicking Search re-fetches with new term and writes to localStorage', async () => {
    const user = userEvent.setup();
    mockedFetch.mockResolvedValue({ results: [] });

    render(<App />);

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });

    await user.type(screen.getByRole('textbox'), '  rick  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenLastCalledWith({ search: 'rick' });
    });
    expect(localStorage.getItem(SEARCH_KEY)).toBe('rick');
  });
});
