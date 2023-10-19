import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Spinner from '~/components/spinner/spinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const WorkPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);
  return (
    <Fragment>
      <Spinner />
    </Fragment>
  );
};

export const getStaticProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      // Spread the returned object into our `props` to expose
      // them to our component during SSR.
      ...(await serverSideTranslations(locale, ['common', 'navbar'])),
    },
  };
};

export default WorkPage;
