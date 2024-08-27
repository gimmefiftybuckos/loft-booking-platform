import { createContext } from 'react';
import clsx from 'clsx';

import styles from './SelectionButton.module.sass';

import { CatalogFiltersType, SelectionFiltersType } from '../../../types';

import { Arrow } from '../Arrow';
import { Modal } from '../Modal';
import { ModalContent } from '../ModalContent';

type SelectionButtonType = {
   item: SelectionFiltersType | CatalogFiltersType;
   index: number;
   onClick: (key: number) => void;
   isActive: boolean;
   title: string | null;
};

type ModalContextType = ((key: number) => void) | null;

export const ModalContext = createContext<ModalContextType>(null);

export const SelectionButton: React.FC<SelectionButtonType> = ({
   item,
   index,
   onClick,
   isActive,
   title,
}) => (
   <div onClick={() => onClick(index)} className={clsx(styles.button)}>
      {title || item}
      <Arrow num={isActive ? index : -1} index={index} />
      <Modal isOpen={isActive}>
         <ModalContext.Provider value={onClick}>
            <ModalContent name={item} />
         </ModalContext.Provider>
      </Modal>
   </div>
);
