import clsx from 'clsx';

import styles from './Arrow.module.sass';

type ArrowProps = {
   num: number;
   index: number;
};

export const Arrow = ({ num, index }: ArrowProps) => {
   return (
      <img
         className={clsx(
            styles.arrow,
            num === index ? styles.arrow_open : null
         )}
         src='/assets/down.svg'
         alt='Dropdown Icon'
         width='16'
         height='16'
      />
   );
};
