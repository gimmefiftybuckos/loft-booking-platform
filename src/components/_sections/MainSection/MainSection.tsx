import clsx from 'clsx';

import styles from './MainSection.module.sass';

import { getTitleByFilter, selectionFilters } from '../../../utils';
import { Button } from '../../_reusable/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setType, setToSearchType } from '../../../store/cardCatalogSlice';

import { SelectionButton } from '../../_reusable/SelectionButton';
import { CoverTitle } from '../../CoverTitle';
import { useModalControl } from '../../../hooks/useModalControl';
import { ModalBackdrop } from '../../_reusable/ModalBackdrop';

export const MainSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { toSearchType } = useSelector((state: RootState) => state.cards);
   const { toggleModal, controlIndex } = useModalControl();

   const handleClick = () => {
      dispatch(setType(toSearchType));
      dispatch(setToSearchType(''));
   };

   return (
      <>
         <ModalBackdrop />
         <section className={clsx(styles.cover)}>
            <CoverTitle />
            <div
               className={clsx(
                  styles.container,
                  controlIndex !== -1 && styles.container_focus
               )}
            >
               {selectionFilters.map((item, index) => (
                  <SelectionButton
                     key={index}
                     title={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={controlIndex === index}
                     currentValue={getTitleByFilter(item) || null}
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
