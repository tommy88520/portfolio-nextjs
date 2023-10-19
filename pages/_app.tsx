import { useEffect, Suspense } from 'react';

import nextI18NextConfig from '../next-i18next.config.js';
import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from '~/components/layout/layout';
import Head from 'next/head';
import Spinner from '~/components/spinner/spinner';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Tommy Huang</title>
      </Head>
      <Suspense fallback={<Spinner />}>
        <Component {...pageProps} />
      </Suspense>
    </Layout>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
