import type { ReactNode } from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

jest.mock('../../../i18n/navigation', () => ({
  Link: ({ children }: { href: unknown; children: ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

import { SearchPagination } from '../searchPagination';

describe('SearchPagination', () => {
  test('disables previous on the first page', () => {
    renderWithProviders(<SearchPagination page={1} totalPages={3} />);

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Previous').tagName).toBe('SPAN');
    expect(screen.getByText('Next').tagName).toBe('A');
  });

  test('enables both controls on a middle page', () => {
    renderWithProviders(
      <SearchPagination page={2} totalPages={3} query="rick" />
    );

    expect(screen.getByText('Previous').tagName).toBe('A');
    expect(screen.getByText('Next').tagName).toBe('A');
  });

  test('disables next on the last page', () => {
    renderWithProviders(<SearchPagination page={3} totalPages={3} />);
    expect(screen.getByText('Next').tagName).toBe('SPAN');
  });
});
