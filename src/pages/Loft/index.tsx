import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { useDispatch, useSelector } from '../../store';
import { useModalControl } from '../../hooks/useModalControl';
import { getLoft, resetLoft } from '../../store/slices/cardCatalog';

import { Modal, ModalTypes } from '../../features/modal/Modal';
import { LoftImages } from '../../sections/LoftImages';
import { LoftDescription } from '../../sections/LoftDescription';
import { ModalContent } from '../../features/modal/ModalContent';
import { Input } from '../../components/Input';
import { LoftComments } from '../../sections/LoftComments';

export const Loft = () => {
   const { pathname } = useLocation();
   const { controlIndex } = useModalControl();

   const { card } = useSelector((state) => state.cards);
   const dispatch = useDispatch();

   const id = pathname.split('/')[2];

   useEffect(() => {
      dispatch(getLoft(id));

      return () => {
         dispatch(resetLoft());
      };
   }, []);

   if (!card) {
      return null;
   }

   return (
      <>
         <Modal
            className={clsx(styles.modal, styles.modal__images)}
            isOpen={controlIndex >= 0 && controlIndex < 100}
         >
            <ModalContent name={'Images'} />
         </Modal>
         <Modal
            className={clsx(styles.modal, styles.modal__review)}
            isOpen={controlIndex === ModalTypes.REVIEW}
         >
            <div>
               <Input placeholder='Отзыв...' />
            </div>
         </Modal>

         <LoftImages />
         <LoftDescription />
         <LoftComments />
      </>
   );
};
