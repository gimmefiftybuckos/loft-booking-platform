import clsx from 'clsx';

import styles from './Distance.module.sass';

import { Text } from '../Text';

export const Distance = () => {
   return (
      <div className={clsx(styles.distance)}>
         <div className={clsx(styles.distance__metro)}>
            <Text size='14'>Бауманская</Text>
         </div>
         <div className={clsx(styles.distance__time)}>
            <Text color='gray' size='14'>
               7 минут
            </Text>
         </div>
      </div>
   );
};
