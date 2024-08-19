import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import styles from './Catalog.module.sass';

import { getLoftsData } from '../../api';
import { AppDispatch, RootState } from '../../store';
import { resetCardsState } from '../../store/cardCatalogSlicee';
import { catalogFilters } from '../../utils';

import { Text } from '../_reusable/Text';
import { Card } from '../_reusable/Card';

export const Catalog = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { cards, filter, page, hasMore, status } = useSelector(
      (state: RootState) => state.cards
   );

   const fetchMore = () => {
      if (status !== 'loading' && hasMore) {
         dispatch(
            getLoftsData({
               filter,
               page,
            })
         );
      }
   };

   // useEffect(() => {
   //    console.log(cards);
   // }, [cards]);

   useEffect(() => {
      dispatch(resetCardsState());
      dispatch(getLoftsData({ filter, page: 1 }));

      return () => {
         dispatch(resetCardsState());
      };
   }, [filter, dispatch]);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles.buttons)}>
            {catalogFilters.map((item, index) => {
               if (index === 0 || index === catalogFilters.length - 1) {
                  return (
                     <button
                        key={index}
                        className={clsx(styles.button, styles.button_drop)}
                     >
                        <Text weight={500}>{item}</Text>
                        <img
                           src='/assets/down.svg'
                           alt='Dropdown Icon'
                           width='16'
                           height='16'
                        />
                     </button>
                  );
               }

               return (
                  <button key={index} className={clsx(styles.button)}>
                     <Text weight={500}>{item}</Text>
                  </button>
               );
            })}
         </div>
         <div className={clsx(styles.content)}>
            <Text as={'h1'} weight={700} size='32'>
               Все лофты Москвы в аренду под мероприятия
            </Text>
            <InfiniteScroll
               className={clsx(styles.container)}
               next={fetchMore}
               hasMore={hasMore}
               loader={<p>Загрузка...</p>}
               dataLength={cards.length}
            >
               {cards.map((item) => (
                  <Card key={item.id} wide cardData={item} />
               ))}
            </InfiniteScroll>
         </div>
      </section>
   );
};
