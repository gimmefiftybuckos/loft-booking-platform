import clsx from 'clsx';

import styles from './Room.module.sass';

import { Text } from '../Text';

type RoomProps = {
   area: number;
   persons: number;
   seats: number;
};

export const Room: React.FC<RoomProps> = ({ area, persons, seats }) => {
   return (
      <div className={clsx(styles.room)}>
         <div className={clsx(styles.room__people)}>
            <Text size='14' as={'p'}>
               {persons} чел
            </Text>
         </div>
         <div className={clsx(styles.room__seats)}>
            <Text size='14' as={'p'}>
               {seats} мест
            </Text>
         </div>
         <div className={clsx(styles.room__area)}>
            <Text size='14' as={'p'}>
               {area} m²
            </Text>
         </div>
      </div>
   );
};
