import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../Text';

type DistanceProps = {
   metro: string;
   time: number;
};

export const Distance: React.FC<DistanceProps> = ({ metro, time }) => {
   return (
      <div className={clsx(styles.distance)}>
         <div className={clsx(styles.distance__metro)}>
            <Text size='14'>{metro}</Text>
         </div>
         <div className={clsx(styles.distance__time)}>
            <Text color='gray' size='14'>
               {time} минут
            </Text>
         </div>
      </div>
   );
};
