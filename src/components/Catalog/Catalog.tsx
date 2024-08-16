import clsx from 'clsx';

import { Text } from '../_reusable/Text';

import styles from './Catalog.module.sass';
import { Card } from '../_reusable/Card';
import { useEffect } from 'react';
import { getLoftsData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

export const Catalog = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { cards } = useSelector((state: RootState) => state.cards);

   useEffect(() => {
      dispatch(getLoftsData(''));
   }, []);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles.buttons)}>
            <button>Событие</button>
            <button>Событие</button>
            <button>Событие</button>
            <button>Событие</button>
         </div>
         <div className={clsx(styles.content)}>
            <Text as={'h1'} weight={700} size='32'>
               Все лофты Москвы в аренду под мероприятия
            </Text>
            <div className={clsx(styles.container)}>
               {cards.map((item) => {
                  return <Card key={item.id} wide cardData={item} />;
               })}
            </div>
         </div>
      </section>
   );
};
