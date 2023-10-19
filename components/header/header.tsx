import Link from 'next/link';
import LanguageSwitcher from './languageSwitcher';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <div>
        <Link href='/'>
          <h2>{t('app_title')}</h2>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
