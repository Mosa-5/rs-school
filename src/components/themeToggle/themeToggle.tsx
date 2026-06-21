'use client';

import { useTheme } from '../../context/themeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} suppressHydrationWarning>
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}

export default ThemeToggle;
