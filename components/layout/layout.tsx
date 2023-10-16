import { Fragment, Suspense } from 'react';

import Navbar from '../navbar/navbar';
import Footer from '~/components/footer/footer';
import Spinner from '../spinner/spinner';
import { useTranslation } from 'react-i18next';

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
