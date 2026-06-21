import { setRequestLocale, getTranslations } from 'next-intl/server';
import styles from './about.module.css';

export const dynamic = 'force-static';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');

  return (
    <section className={styles.about}>
      <h1>{t('title')}</h1>
      <p>{t('builtBy')}</p>
      <p>
        {t('learnMore')}{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('courseLink')}
        </a>
      </p>
    </section>
  );
}
