import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('App');

  return (
    <main className="app">
      <h1>{t('title')}</h1>
    </main>
  );
}
