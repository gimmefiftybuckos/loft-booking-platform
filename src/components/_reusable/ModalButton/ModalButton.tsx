import clsx from 'clsx';

import styles from './ModalButton.module.sass';

type ModalButtonProps = {
   onClick: () => void;
   children: string;
   primary?: boolean;
};

export const ModalButton: React.FC<ModalButtonProps> = ({
   onClick,
   children,
   primary,
}) => (
   <button
      className={clsx(
         styles.button,
         primary ? styles.button_primary : styles.button_accent
      )}
      onClick={onClick}
   >
      {children}
   </button>
);
