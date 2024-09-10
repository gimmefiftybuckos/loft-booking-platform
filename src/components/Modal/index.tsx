import clsx from 'clsx';

import styles from './index.module.sass';

type ModalProps = {
   children: React.ReactNode;
   isOpen: boolean;
};

export const Modal = ({ isOpen, children }: ModalProps) => {
   return (
      <div
         onClick={(event) => event.stopPropagation()}
         className={clsx(styles.modal, isOpen ? styles.modal_open : null)}
      >
         {children}
      </div>
   );
};
