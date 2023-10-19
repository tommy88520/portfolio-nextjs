import { Fragment, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
// import Navbar from '../navbar/navbar';
// import Footer from '~/components/footer/footer';
import Spinner from '../spinner/spinner';
import { useTranslation } from 'react-i18next';
import { worksStore, rootUrlStore, allStore } from '~/store/index';

const Navbar = dynamic(() => import('../navbar/navbar'), {
  ssr: false,
});

const Footer = dynamic(() => import('../footer/footer'), {
  ssr: false,
});
function Layout(props: any) {
  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <main>{props.children}</main>
        <Footer />
      </Suspense>
    </Fragment>
  );
}

export default Layout;
