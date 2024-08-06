import clsx from 'clsx';
import { Navigation } from '../Navigation';
import styles from './Header.module.sass';

type HeaderProps = {
   isSticky?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isSticky }) => {
   const sticky = isSticky ? styles.header_sticky : null;

   return (
      <header className={clsx(styles.header, sticky)}>
         <Navigation></Navigation>
      </header>
   );
};
