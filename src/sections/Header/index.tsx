import clsx from 'clsx';

import styles from './index.module.sass';

import { Navigation } from './Navigation';

type HeaderProps = {
   isSticky?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isSticky }) => {
   const sticky = isSticky ? styles.header_sticky : null;

   return (
      <header className={clsx(styles.header, sticky)}>
         <Navigation />
      </header>
   );
};
