import clsx from 'clsx';

import styles from './Rating.module.sass';

import { Text } from '../Text';

export const Rating = () => {
   const test = [1, 2, 3, 4, 5];

   return (
      <div className={clsx(styles.rating)}>
         <div className={clsx(styles.rating__stars)}>
            {test.map(() => (
               <div aria-hidden className={clsx(styles.rating__star)}></div>
            ))}
         </div>
         <div className={clsx(styles.rating__review)}>
            <Text size='14'>4.0</Text>
            <Text size='14' color='gray'>
               (15 отзывов)
            </Text>
         </div>
      </div>
   );
};
