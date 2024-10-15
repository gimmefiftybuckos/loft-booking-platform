import clsx from 'clsx';

import styles from './index.module.sass';

import { getTitleByFilter } from '../../services/utils';
import { selectionFilters } from '../../services/constants';
import { useModalControl } from '../../hooks/useModalControl';

import { Button, ButtonVariant } from '../../components/Button';
import {
   SelectionButton,
   SelectionVariant,
} from '../../features/modal/SelectionButton';
import { CoverTitle } from './CoverTitle';
import { Link } from 'react-router-dom';

export const HomeCover = () => {
   const { toggleModal, closeModal, controlIndex } = useModalControl();

   return (
      <>
         <section className={clsx(styles.cover)}>
            <CoverTitle />
            <div
               className={clsx(
                  styles.container,
                  controlIndex !== -1 &&
                     controlIndex < 200 &&
                     styles.container_focus
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
                     variant={SelectionVariant.MAIN}
                  />
               ))}

               <Button
                  as={Link}
                  pathTo='/catalog'
                  variant={ButtonVariant.ACCENT}
                  onClick={closeModal}
                  className={clsx(styles.button)}
               >
                  Найти
               </Button>
            </div>
         </section>
      </>
   );
};
