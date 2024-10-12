import { ScrollRestoration } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Backdrop } from '../../features/modal/Backdrop';

export const Layout = ({
   children,
   hideFooter,
}: {
   children: React.ReactNode;
   hideFooter?: boolean;
}) => (
   <>
      <ScrollRestoration />
      <Backdrop />
      <Header isSticky />
      {children}
      {!hideFooter && <Footer />}
   </>
);
