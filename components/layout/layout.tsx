import { Fragment, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '../spinner/spinner';
import BackgroundColor from '~/components/backgroundColor/backgroundColor';

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
        <BackgroundColor />
      </Suspense>
    </Fragment>
  );
}

export default Layout;
