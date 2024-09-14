import clsx from 'clsx';

import styles from './index.module.sass';

type ArrowProps = {
   num?: number;
   index?: number;
   turnRight?: boolean;
};

export const Arrow = ({ num, index, turnRight }: ArrowProps) => {
   return (
      <img
         className={clsx(
            styles.arrow,
            turnRight && styles.arrow_right,
            num === index ? styles.arrow_open : null
         )}
         src='/assets/down.svg'
         alt='Dropdown Icon'
         width='16'
         height='16'
      />
   );
};
