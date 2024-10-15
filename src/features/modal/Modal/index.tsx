import clsx from 'clsx';

import styles from './index.module.sass';

import { useEffect } from 'react';
import { useModalControl } from '../../../hooks/useModalControl';

type ModalProps = {
   children: React.ReactNode;
   isOpen: boolean;
   className?: string;
};

export enum ModalTypes {
   'MENU' = 100,
   'REVIEW' = 51,
}

export const Modal = ({ isOpen, children, className }: ModalProps) => {
   const { closeModal } = useModalControl();

   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         e.key === 'Escape' && closeModal();
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
         document.removeEventListener('keydown', handleEsc);
      };
   }, []);

   return (
      <div
         onClick={(event) => event.stopPropagation()}
         className={clsx(
            styles.modal,
            isOpen ? styles.modal_open : null,
            className
         )}
      >
         {children}
      </div>
   );
};
