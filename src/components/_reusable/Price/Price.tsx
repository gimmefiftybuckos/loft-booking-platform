import clsx from 'clsx';

import styles from './Price.module.sass';

import { Text } from '../Text';

export const Price = () => {
   return (
      <div className={clsx(styles.price)}>
         <Text color='gray' size='14'>
            от{' '}
            <Text size='20' weight={600} as={'span'}>
               3000 ₽
            </Text>{' '}
            / час
         </Text>
      </div>
   );
};
