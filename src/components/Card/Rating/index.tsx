import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../ui/Text';

type RatingProps = {
   reviewsCount: number;
   averageRating: string;
};

export const Rating: React.FC<RatingProps> = ({
   reviewsCount,
   averageRating,
}) => {
   const test = [1, 2, 3, 4, 5];

   const flooredRating = Math.floor(+averageRating * 2) / 2;

   return (
      <div className={clsx(styles.rating)}>
         <div className={clsx(styles.rating__stars)}>
            {test.map((item, index) => {
               if (flooredRating - index === 0.5) {
                  return (
                     <div
                        key={index}
                        aria-hidden
                        className={clsx(
                           styles.rating__star,
                           styles.rating__star_half
                        )}
                     ></div>
                  );
               }

               if (flooredRating <= index) {
                  return (
                     <div
                        key={index}
                        aria-hidden
                        className={clsx(styles.rating__star)}
                     ></div>
                  );
               }

               if (flooredRating > index) {
                  return (
                     <div
                        key={index}
                        aria-hidden
                        className={clsx(
                           styles.rating__star,
                           styles.rating__star_full
                        )}
                     ></div>
                  );
               }
            })}
         </div>
         <div className={clsx(styles.rating__review)}>
            <Text size='14'>{averageRating}</Text>
            <Text size='14' color='gray'>
               {reviewsCount} отзывов
            </Text>
         </div>
      </div>
   );
};
