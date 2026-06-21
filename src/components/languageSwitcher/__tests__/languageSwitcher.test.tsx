import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('q=rick'),
}));

jest.mock('../../../i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace: mockReplace }),
}));

import { LanguageSwitcher } from '../languageSwitcher';

describe('LanguageSwitcher', () => {
  test('switches locale and preserves the query string', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageSwitcher />);

    await user.selectOptions(screen.getByRole('combobox'), 'ka');

    expect(mockReplace).toHaveBeenCalledWith('/?q=rick', { locale: 'ka' });
  });
});
