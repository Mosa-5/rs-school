'use client';

import { useTranslations } from 'next-intl';

type ErrorBoundaryProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorBoundary({ reset }: ErrorBoundaryProps) {
  const t = useTranslations('Error');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('message')}</p>
      <button type="button" onClick={reset}>
        {t('retry')}
      </button>
    </section>
  );
}
