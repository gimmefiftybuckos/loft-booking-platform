import clsx from 'clsx';
import { createContext, useEffect, useState } from 'react';

import styles from './MainSection.module.sass';

import {
   cardSectionList,
   formatDate,
   getValueByAnother,
   selectionParams,
} from '../../../utils';

import { Button } from '../../_reusable/Button';
import { Modal } from '../../_reusable/Modal';
import { ModalContent } from '../../_reusable/ModalContent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { selectionParamsType } from '../../../types';
import { setType, setToSearchType } from '../../../store/cardCatalogSlice';

import { Arrow } from '../../_reusable/Arrow';

type ModalContextType = ((key: number) => void) | null;

export const ModalContext = createContext<ModalContextType>(null);

export const MainSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { toSearchType, date } = useSelector(
      (state: RootState) => state.cards
   );

   const [openModalKey, setOpenModalKey] = useState(-1);
   const [fullDate, setFullDate] = useState<string | null>(null);

   useEffect(() => {
      const newDate = formatDate(date);
      setFullDate(newDate);
   }, [date]);

   const selectionReducer = (type: selectionParamsType) => {
      if (type === 'Мероприятие') {
         if (!toSearchType) {
            return null;
         }

         const title = getValueByAnother(toSearchType, cardSectionList);

         return title;
      }

      if (type === 'Дата') {
         return fullDate;
      }
   };

   const toggleModal = (key: number) => {
      setOpenModalKey(openModalKey === key ? -1 : key);
   };

   useEffect(() => {
      document.body.style.overflow = openModalKey !== -1 ? 'hidden' : 'visible';
   }, [openModalKey]);

   const onClick = () => {
      dispatch(setType(toSearchType));
      dispatch(setToSearchType(''));
   };

   return (
      <>
         {openModalKey !== -1 ? (
            <div
               onClick={() => toggleModal(-1)}
               className={clsx(styles.modalBackdrop)}
            ></div>
         ) : null}

         <section className={clsx(styles.cover)}>
            <h1 className={clsx(styles.title)}>
               Более 500 площадок для вашего мероприятия
            </h1>

            <div
               className={clsx(
                  styles.container,
                  openModalKey !== -1 ? styles.container_focus : null
               )}
            >
               {selectionParams.map((item, index) => {
                  return (
                     <div
                        onClick={() => toggleModal(index)}
                        key={index}
                        className={clsx(styles.button)}
                     >
                        {selectionReducer(item) || item}
                        <Arrow num={openModalKey} index={index} />

                        <Modal isOpen={openModalKey === index}>
                           <ModalContext.Provider value={toggleModal}>
                              <ModalContent name={item} />
                           </ModalContext.Provider>
                        </Modal>
                     </div>
                  );
               })}

               <Button
                  inMainSection
                  textColor='white'
                  accented
                  onClick={onClick}
                  pathTo={'/catalog'}
               >
                  Найти
               </Button>
            </div>
         </section>
      </>
   );
};
