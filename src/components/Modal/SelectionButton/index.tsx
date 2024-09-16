import clsx from 'clsx';

import styles from './index.module.sass';

import { CatalogFiltersType, SelectionFiltersType } from '../../../types';

import { Modal } from '../../Modal';
import { ModalContent } from '../ModalContent';
import { Text } from '../../ui/Text';
import { Arrow } from '../../ui/Arrow';
import { ModalContext } from '../../../context';

type SelectionButtonType = {
   title: SelectionFiltersType | CatalogFiltersType;
   index: number;
   onClick: (key: number) => void;
   isActive: boolean;
   currentValue?: string | null;
   variant?: string;
};

export enum SelectionVariant {
   MAIN = 'main',
   CATALOG = 'catalog',
}

export const SelectionButton: React.FC<SelectionButtonType> = ({
   title,
   index,
   onClick,
   isActive,
   currentValue,
   variant,
}) => {
   const variantClassName = variant ? styles[`button__${variant}`] : null;

   return (
      <div
         onClick={() => onClick(index)}
         className={clsx(styles.button, variantClassName)}
      >
         <Text weight={500}>{currentValue || title}</Text>
         <Arrow num={isActive ? index : -1} index={index} />
         <Modal isOpen={isActive}>
            <ModalContext.Provider value={onClick}>
               <ModalContent name={title} />
            </ModalContext.Provider>
         </Modal>
      </div>
   );
};
