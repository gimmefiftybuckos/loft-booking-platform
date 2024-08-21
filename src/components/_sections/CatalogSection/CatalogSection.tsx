import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import styles from './CatalogSection.module.sass';

import { getLoftsData } from '../../../api';
import { AppDispatch, RootState } from '../../../store';
import { resetCardsState } from '../../../store/cardCatalogSlice';
import { cardSectionList, catalogFilters } from '../../../utils';

import { Text } from '../../_reusable/Text';
import { Card } from '../../_reusable/Card';
import { useSearchParams } from 'react-router-dom';

export const CatalogSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { cards, filter, page, hasMore, status } = useSelector(
      (state: RootState) => state.cards
   );

   const [searchParams, setSearchParams] = useSearchParams();
   const [titleState, setTitle] = useState('');

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

   useEffect(() => {
      if (filter) setSearchParams({ filter });

      const filterParam = filter || searchParams.get('filter') || '';

      const title = cardSectionList.find(
         (item) => item.filter === filterParam
      )?.title;
      if (title) setTitle(title);

      dispatch(resetCardsState());
      dispatch(getLoftsData({ filter: filterParam, page: 1 }));

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
               {titleState}
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
