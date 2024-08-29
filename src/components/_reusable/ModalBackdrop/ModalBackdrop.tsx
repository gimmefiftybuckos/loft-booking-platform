import clsx from 'clsx';

import styles from './ModalBackdrop.module.sass';

import { useModalControl } from '../../../hooks/useModalControl';

export const ModalBackdrop = () => {
   const { controlIndex, closeModal } = useModalControl();

   return (
      <>
         {controlIndex !== -1 && (
            <div onClick={closeModal} className={clsx(styles.backdrop)} />
         )}
      </>
   );
};
