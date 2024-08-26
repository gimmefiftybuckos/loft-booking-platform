import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './MainSection.module.sass';

import {
   cardSectionList,
   formatDate,
   getValueByAnother,
   selectionParams,
} from '../../../utils';
import { Button } from '../../_reusable/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setType, setToSearchType } from '../../../store/cardCatalogSlice';

import { SelectionButton } from '../../_reusable/SelectionButton';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { selectionParamsType } from '../../../types';
import { CoverTitle } from '../../CoverTitle';

export const MainSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { toSearchType, date } = useSelector(
      (state: RootState) => state.cards
   );

   const [openModalKey, setOpenModalKey] = useState(-1);
   const [fullDate, setFullDate] = useState<string | null>(null);

   useBodyScrollLock(openModalKey !== -1);

   const toggleModal = (key: number) =>
      setOpenModalKey(openModalKey === key ? -1 : key);

   const handleClick = () => {
      dispatch(setType(toSearchType));
      dispatch(setToSearchType(''));
   };

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

   return (
      <>
         {openModalKey !== -1 && (
            <div
               onClick={() => toggleModal(-1)}
               className={clsx(styles.modalBackdrop)}
            />
         )}

         <section className={clsx(styles.cover)}>
            <CoverTitle />

            <div
               className={clsx(
                  styles.container,
                  openModalKey !== -1 && styles.container_focus
               )}
            >
               {selectionParams.map((item, index) => (
                  <SelectionButton
                     key={index}
                     item={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={openModalKey === index}
                     title={selectionReducer(item) || null}
                  />
               ))}

               <Button
                  inMainSection
                  textColor='white'
                  accented
                  onClick={handleClick}
                  pathTo='/catalog'
               >
                  Найти
               </Button>
            </div>
         </section>
      </>
   );
};
