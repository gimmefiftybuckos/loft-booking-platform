import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../../ui/Text';

export enum RoomInfoVariant {
   CATALOG = 'catalog',
   PAGE = 'page',
}

type RoomProps = {
   area: number;
   persons: number;
   seats: number;
   variant?: RoomInfoVariant | '';
};

export const Room: React.FC<RoomProps> = ({
   area,
   persons,
   seats,
   variant,
}) => {
   const variantClassName = variant ? styles[`room_${variant}`] : null;

   return (
      <div className={clsx(styles.room, variantClassName)}>
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
         {variant && (
            <div className={clsx(styles.room__bell, styles.room__element)}>
               <Text size='14' as={'p'}>
                  Еда с собой
               </Text>
            </div>
         )}
      </div>
   );
};
