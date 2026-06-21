'use client';

import type { ChangeEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import { routing, type Locale } from '../../i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Nav');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { locale: nextLocale });
  };

  return (
    <select value={locale} onChange={handleChange} aria-label={t('language')}>
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
