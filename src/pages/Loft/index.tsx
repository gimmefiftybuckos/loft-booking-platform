import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { useDispatch } from '../../store';
import { useModalControl } from '../../hooks/useModalControl';
import { getLoft, resetLoft } from '../../store/slices/cardCatalog';

import { Modal } from '../../features/modal/Modal';
import { LoftImages } from '../../sections/LoftImages';
import { LoftDescription } from '../../sections/LoftDescription';
import { ModalContent } from '../../features/modal/ModalContent';

export const Loft = () => {
   const { pathname } = useLocation();
   const { controlIndex } = useModalControl();
   const dispatch = useDispatch();

   const id = pathname.split('/')[2];

   useEffect(() => {
      dispatch(getLoft(id));

      return () => {
         dispatch(resetLoft());
      };
   }, []);

   return (
      <>
         <Modal className={clsx(styles.carousel)} isOpen={controlIndex >= 0}>
            <ModalContent name={'Images'} />
         </Modal>

         <LoftImages />
         <LoftDescription />
      </>
   );
};
