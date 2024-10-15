import clsx from 'clsx';

import styles from './index.module.sass';

import { useModalControl } from '../../../hooks/useModalControl';
import { ModalTypes } from '../../../features/modal/Modal';

export const Backdrop = () => {
   const { controlIndex, closeModal } = useModalControl();

   return (
      <>
         {controlIndex !== -1 && (
            <div
               onClick={closeModal}
               className={clsx(
                  styles.backdrop,
                  controlIndex === ModalTypes.MENU && styles.backdrop_invisible
               )}
            />
         )}
      </>
   );
};
