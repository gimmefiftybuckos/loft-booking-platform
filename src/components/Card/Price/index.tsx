import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../Text';

type PriceProps = {
   price: number;
   outline?: boolean;
};

export const Price: React.FC<PriceProps> = ({ price, outline }) => {
   const size = outline ? styles.price_outline : null;

   return (
      <div className={clsx(styles.price, size)}>
         <Text color='gray' size='14'>
            от{' '}
            <Text size='20' weight={600} as={'span'}>
               {price} ₽
            </Text>{' '}
            / час
         </Text>
      </div>
   );
};
