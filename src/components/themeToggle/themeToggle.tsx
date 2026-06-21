'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/themeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Theme');

  return (
    <button type="button" onClick={toggleTheme} suppressHydrationWarning>
      {theme === 'light' ? t('switchToDark') : t('switchToLight')}
    </button>
  );
}

export default ThemeToggle;
