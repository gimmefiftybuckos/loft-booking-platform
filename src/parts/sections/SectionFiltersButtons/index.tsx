import clsx from 'clsx';

import styles from './index.module.sass';

import { catalogFilters } from '../../../services/constants';
import { getTitleByFilter } from '../../../services/utils';
import { useModalControl } from '../../../hooks/useModalControl';

import {
   SelectionButton,
   SelectionVariant,
} from '../../../components/Modal/SelectionButton';

export const SectionFiltersButtons = () => {
   const { toggleModal, controlIndex } = useModalControl();

   return (
      <section>
         <div
            className={clsx(
               styles.buttons,
               controlIndex !== -1 && styles.buttons_focus
            )}
         >
            {catalogFilters.map((item, index) => {
               return (
                  <SelectionButton
                     key={index}
                     title={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={controlIndex === index}
                     currentValue={getTitleByFilter(item) || null}
                     variant={SelectionVariant.CATALOG}
                  />
               );
            })}
         </div>
      </section>
   );
};
