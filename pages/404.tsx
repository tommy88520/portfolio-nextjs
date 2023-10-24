import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import classes from './notFound.module.scss';

const NotFoundPage = () => {
  const errorText = `按此返回首頁畫面`;
  return (
    <div className={classes['not-found']}>
      <p className={classes['not-found__text']} title='404'>
        404
      </p>
      <Link className={classes['not-found__error-countdown']} href='/'>
        {errorText}
      </Link>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['navbar'])),
    },
  };
};

export default NotFoundPage;
