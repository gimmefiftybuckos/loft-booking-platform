import clsx from 'clsx';

import styles from './index.module.sass';

import { getTitleByFilter, selectionFilters } from '../../utils';
import { Button } from '../Button';

import { SelectionButton } from '../Modal/SelectionButton';
import { CoverTitle } from './CoverTitle';
import { useModalControl } from '../../hooks/useModalControl';
import { Backdrop } from '../Backdrop';

export const MainSection = () => {
   const { toggleModal, closeModal, controlIndex } = useModalControl();

   return (
      <>
         <Backdrop />
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
                  pathTo='/catalog'
                  onClick={closeModal}
               >
                  Найти
               </Button>
            </div>
         </section>
      </>
   );
};
