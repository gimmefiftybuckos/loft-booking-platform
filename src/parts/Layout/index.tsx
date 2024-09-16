import { ScrollRestoration } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Backdrop } from '../../components/Modal/Backdrop';

export const Layout = ({ children }: { children: React.ReactNode }) => (
   <>
      <ScrollRestoration />
      <Backdrop />
      <Header isSticky />
      {children}
      <Footer />
   </>
);
