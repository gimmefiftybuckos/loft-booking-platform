import clsx from 'clsx';

import styles from './index.module.sass';

import { Navigation } from './Navigation';
import { useModalControl } from '../../hooks/useModalControl';
import { ModalTypes } from '../../features/modal/Modal';

type HeaderProps = {
   isSticky?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isSticky }) => {
   const sticky = isSticky ? styles.header_sticky : null;
   const { controlIndex } = useModalControl();

   return (
      <header
         className={clsx(
            styles.header,
            sticky,
            controlIndex === ModalTypes.MENU && styles.header_z
         )}
      >
         <Navigation />
      </header>
   );
};
