import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import ThemeToggle from '../themeToggle/themeToggle';
import { LanguageSwitcher } from '../languageSwitcher/languageSwitcher';
import styles from './header.module.css';

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          {t('home')}
        </Link>
        <Link href="/about" className={styles.link}>
          {t('about')}
        </Link>
      </nav>

      <div className={styles.actions}>
        <Suspense>
          <LanguageSwitcher />
        </Suspense>
        <ThemeToggle />
      </div>
    </header>
  );
}
