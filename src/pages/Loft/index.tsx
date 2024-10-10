import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { useModalControl } from '../../hooks/useModalControl';

import { Modal } from '../../components/Modal';
import { SectionLoftImages } from '../../parts/sections/SectionLoftImages';
import { useDispatch, useSelector } from '../../store';
import { getLoft, resetLoft } from '../../store/slices/cardCatalog';
import { ModalContent } from '../../components/Modal/ModalContent';
import { SectionLoftDescription } from '../../parts/sections/SectionLoftDescription';

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

         <SectionLoftImages />
         <SectionLoftDescription />
      </>
   );
};
