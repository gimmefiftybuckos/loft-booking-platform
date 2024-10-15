import clsx from 'clsx';

import styles from './index.module.sass';

export const Stars = ({
   averageRating,
   size,
}: {
   averageRating: string | undefined;
   size?: boolean;
}) => {
   if (averageRating === undefined) {
      return null;
   }
   const stars = [1, 2, 3, 4, 5];

   const flooredRating = Math.floor(+averageRating * 2) / 2;

   return (
      <div className={clsx(styles.container)}>
         {stars.map((item, index) => {
            if (flooredRating - index === 0.5) {
               return (
                  <div
                     key={index}
                     aria-hidden
                     className={clsx(
                        styles.star,
                        styles.star_half,
                        size && styles.star_big
                     )}
                  ></div>
               );
            }

            if (flooredRating <= index) {
               return (
                  <div
                     key={index}
                     aria-hidden
                     className={clsx(styles.star, size && styles.star_big)}
                  ></div>
               );
            }

            if (flooredRating > index) {
               return (
                  <div
                     key={index}
                     aria-hidden
                     className={clsx(
                        styles.star,
                        styles.star_full,
                        size && styles.star_big
                     )}
                  ></div>
               );
            }
         })}
      </div>
   );
};
