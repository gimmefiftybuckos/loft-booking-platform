import clsx from 'clsx';

import styles from './Price.module.sass';

import { Text } from '../Text';

type PriceProps = {
   price: number;
};

export const Price: React.FC<PriceProps> = ({ price }) => {
   return (
      <div className={clsx(styles.price)}>
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
