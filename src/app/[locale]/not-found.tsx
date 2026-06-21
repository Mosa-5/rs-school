import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className={styles.notFound}>
      <h1>{t('title')}</h1>
      <p>{t('message')}</p>
      <Link href="/">{t('backHome')}</Link>
    </section>
  );
}
