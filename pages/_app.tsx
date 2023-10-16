import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '~/components/layout/layout';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();
  // console.log('toomy1', t('app_title'));
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Tommy Huang</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Belanosima:wght@400;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />;
    </Layout>
  );
};

export default appWithTranslation(App);
