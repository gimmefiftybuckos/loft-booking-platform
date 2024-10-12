import clsx from 'clsx';

import styles from './index.module.sass';

import { useModalControl } from '../../../hooks/useModalControl';

export const Backdrop = () => {
   const { controlIndex, closeModal } = useModalControl();

   return (
      <>
         {controlIndex !== -1 && (
            <div onClick={closeModal} className={clsx(styles.backdrop)} />
         )}
      </>
   );
};
