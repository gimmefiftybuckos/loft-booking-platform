import clsx from 'clsx';
import { useState } from 'react';

import styles from './MainSection.module.sass';

import { getTitleByFilter, selectionFilters } from '../../../utils';
import { Button } from '../../_reusable/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setType, setToSearchType } from '../../../store/cardCatalogSlice';

import { SelectionButton } from '../../_reusable/SelectionButton';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { CoverTitle } from '../../CoverTitle';

export const MainSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { toSearchType } = useSelector((state: RootState) => state.cards);

   const [openModalKey, setOpenModalKey] = useState(-1);

   useBodyScrollLock(openModalKey !== -1);

   const toggleModal = (key: number) =>
      setOpenModalKey(openModalKey === key ? -1 : key);

   const handleClick = () => {
      dispatch(setType(toSearchType));
      dispatch(setToSearchType(''));
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
               {selectionFilters.map((item, index) => (
                  <SelectionButton
                     key={index}
                     item={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={openModalKey === index}
                     title={getTitleByFilter(item) || null}
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
