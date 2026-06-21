import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../../context/ThemeProvider';
import ThemeToggle from '../themeToggle';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

describe('ThemeToggle', () => {
  test('toggles the label and the document theme on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Dark mode' }));

    expect(
      screen.getByRole('button', { name: 'Light mode' })
    ).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
