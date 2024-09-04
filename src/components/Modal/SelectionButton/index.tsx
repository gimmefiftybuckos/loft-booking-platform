import clsx from 'clsx';

import styles from './index.module.sass';

import { CatalogFiltersType, SelectionFiltersType } from '../../../types';

import { Arrow } from '../../Arrow';
import { Modal } from '..';
import { ModalContent } from '../ModalContent';
import { Text } from '../../Text';
import { ModalContext } from '../../../context';

type SelectionButtonType = {
   title: SelectionFiltersType | CatalogFiltersType;
   index: number;
   onClick: (key: number) => void;
   isActive: boolean;
   currentValue?: string | null;
   catalogStyles?: boolean;
};

export const SelectionButton: React.FC<SelectionButtonType> = ({
   title,
   index,
   onClick,
   isActive,
   currentValue,
   catalogStyles,
}) => (
   <div
      onClick={() => onClick(index)}
      className={clsx(
         styles.button,
         !catalogStyles && styles.button__main,
         catalogStyles && styles.button__catalog
      )}
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
