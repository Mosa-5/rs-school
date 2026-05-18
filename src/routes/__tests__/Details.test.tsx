import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Details from '../Details';
import { fetchCharacter, type Character } from '../../api/richAndMorty';

jest.mock('../../api/richAndMorty');

const mockedFetchCharacter = fetchCharacter as jest.Mock;

const character: Character = {
  id: 42,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
};

const renderWithRoute = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/details/:detailsId" element={<Details />} />
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('Details', () => {
  beforeEach(() => {
    mockedFetchCharacter.mockReset();
  });

  test('shows loader while fetching, then character info on success', async () => {
    mockedFetchCharacter.mockResolvedValue(character);

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
    mockedFetchCharacter.mockRejectedValue(new Error('boom'));

    renderWithRoute('/details/42');

    expect(
      await screen.findByText(/could not load character/i)
    ).toBeInTheDocument();
  });

  test('Close button navigates back to home', async () => {
    const user = userEvent.setup();
    mockedFetchCharacter.mockResolvedValue(character);

    renderWithRoute('/details/42');

    await screen.findByRole('heading', { name: 'Rick Sanchez' });
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
