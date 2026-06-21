import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

jest.mock('../../../i18n/navigation', () => ({
  Link: ({ children }: { href: unknown; children: ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

jest.mock('../../../lib/characters', () => ({
  getCharacter: jest.fn(),
}));

import { getCharacter } from '../../../lib/characters';
import { CharacterDetails } from '../characterDetails';

const mockGetCharacter = getCharacter as jest.Mock;

describe('CharacterDetails', () => {
  test('renders the fetched character', async () => {
    mockGetCharacter.mockResolvedValue({
      id: 1,
      name: 'Rick',
      species: 'Human',
      status: 'Alive',
      image: 'https://example.com/rick.jpeg',
    });

    render(await CharacterDetails({ id: '1', page: 1 }));

    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Rick' })).toBeInTheDocument();
  });

  test('renders a not-found message when the character is missing', async () => {
    mockGetCharacter.mockResolvedValue(null);

    render(await CharacterDetails({ id: '999', page: 1 }));

    expect(screen.getByText('notFound')).toBeInTheDocument();
  });
});
