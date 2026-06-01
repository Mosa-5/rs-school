import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../../context/ThemeProvider';
import ThemeToggle from '../themeToggle';

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

describe('ThemeToggle', () => {
  test('starts in light mode and offers dark mode', () => {
    renderToggle();
    expect(
      screen.getByRole('button', { name: 'Dark mode' })
    ).toBeInTheDocument();
  });

  test('switches theme and updates the document attribute', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: 'Dark mode' }));

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(
      screen.getByRole('button', { name: 'Light mode' })
    ).toBeInTheDocument();
  });
});
