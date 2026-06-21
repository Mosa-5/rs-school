import type { ReactNode } from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { makeCharacter } from '../../../test-utils/fetchMock';

jest.mock('../../../i18n/navigation', () => ({
  Link: ({ children }: { href: unknown; children: ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

import { CharacterList } from '../characterList';

describe('CharacterList', () => {
  test('renders a card, avatar and checkbox for each character', () => {
    const characters = [
      makeCharacter({ id: 1, name: 'Rick' }),
      makeCharacter({ id: 2, name: 'Morty' }),
    ];

    renderWithProviders(
      <CharacterList characters={characters} page={1} query="rick" />
    );

    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Morty')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
