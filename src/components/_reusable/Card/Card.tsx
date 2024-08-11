import clsx from 'clsx';

import styles from './Card.module.sass';

import { Text } from '../Text';
import { Price } from '../Price';
import { Rating } from '../Rating';
import { Room } from '../Room';
import { Distance } from '../Distance';

export const Card = () => {
   return (
      <article className={clsx(styles.card)}>
         <div className={clsx(styles.card__container)}>
            <img
               className={clsx(styles.card__image)}
               src='src/assets/preview.png'
               alt=''
            />
         </div>
         <div className={clsx(styles.card__content)}>
            <Text size='18' weight={600} as={'h3'}>
               Лофт из белого кирпича с верандой
            </Text>
            <Distance />
            <Rating />
            <Price />
            <Room />
         </div>
      </article>
   );
};
