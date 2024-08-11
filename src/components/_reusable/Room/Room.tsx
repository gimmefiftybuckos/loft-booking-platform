import clsx from 'clsx';

import styles from './Room.module.sass';

import { Text } from '../Text';

export const Room = () => {
   return (
      <div className={clsx(styles.room)}>
         <div className={clsx(styles.room__people)}>
            <Text size='14' as={'p'}>
               25 чел
            </Text>
         </div>
         <div className={clsx(styles.room__seats)}>
            <Text size='14' as={'p'}>
               38 мест
            </Text>
         </div>
         <div className={clsx(styles.room__area)}>
            <Text size='14' as={'p'}>
               210 m²
            </Text>
         </div>
      </div>
   );
};
