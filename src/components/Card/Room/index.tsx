import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../ui/Text';

type RoomProps = {
   area: number;
   persons: number;
   seats: number;
   wide?: boolean;
};

export const Room: React.FC<RoomProps> = ({ area, persons, seats, wide }) => {
   const room = wide ? styles.room_wide : null;

   return (
      <div className={clsx(styles.room, room)}>
         <div className={clsx(styles.room__people, styles.room__element)}>
            <Text size='14' as={'p'}>
               {persons} чел
            </Text>
         </div>
         <div className={clsx(styles.room__seats, styles.room__element)}>
            <Text size='14' as={'p'}>
               {seats} мест
            </Text>
         </div>
         <div className={clsx(styles.room__area, styles.room__element)}>
            <Text size='14' as={'p'}>
               {area} m²
            </Text>
         </div>
         {wide ? (
            <div className={clsx(styles.room__bell, styles.room__element)}>
               <Text size='14' as={'p'}>
                  Еда с собой
               </Text>
            </div>
         ) : null}
      </div>
   );
};
