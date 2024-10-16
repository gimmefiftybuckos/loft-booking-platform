import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../ui/Text';
import { Stars } from '../../Stars';

type RatingProps = {
   reviewsCount: number;
   averageRating: string;
};

export const Rating: React.FC<RatingProps> = ({
   reviewsCount,
   averageRating,
}) => {
   return (
      <div className={clsx(styles.rating)}>
         <Stars averageRating={averageRating} />
         <div className={clsx(styles.rating__review)}>
            <Text size='14'>{parseFloat(averageRating).toFixed(1)}</Text>
            <Text size='14' color='gray'>
               {reviewsCount} отзывов
            </Text>
         </div>
      </div>
   );
};
