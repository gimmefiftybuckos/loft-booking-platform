import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import styles from './CatalogSection.module.sass';

import { getLoftsData } from '../../../api';
import { AppDispatch, RootState } from '../../../store';
import { resetCardsState } from '../../../store/cardCatalogSlice';
import {
   cardSectionList,
   catalogFilters,
   getValueByAnother,
} from '../../../utils';

import { Text } from '../../_reusable/Text';
import { Card } from '../../_reusable/Card';
import { Arrow } from '../../_reusable/Arrow';

export const CatalogSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { cards, type, date, page, hasMore, status } = useSelector(
      (state: RootState) => state.cards
   );

   const [searchParams, setSearchParams] = useSearchParams();
   const [titleState, setTitle] = useState('');

   const initialTypeParam = type || searchParams.get('type') || '';
   const [typeParam, setTypeParams] = useState(initialTypeParam);

   const initialDateParam =
      encodeURIComponent(date) ||
      decodeURIComponent(searchParams.get('date') || '');
   const [dateParam] = useState(initialDateParam);

   const fetchMore = () => {
      if (status !== 'loading' && hasMore) {
         dispatch(
            getLoftsData({
               type: typeParam,
               page,
               date: dateParam,
            })
         );
      }
   };

   /*
    * Inital query parameters method
    */
   const updateSearchParams = (type: string, date: string) => {
      const params: Record<string, string> = {};
      if (type) params.type = type;
      if (date) params.date = encodeURIComponent(date);
      setSearchParams(params, { replace: true });
   };

   /*
    * This useEffect allows you to change type values from external components.
    * The re-rendering process occurs when the typeParam is changed.
    * Other query parameters are not affected.
    */
   useEffect(() => {
      setTypeParams(type || searchParams.get('type') || '');
   }, [type]);

   /*
    * Basic handler for the CatalogSection component.
    */
   useEffect(() => {
      const title = getValueByAnother(typeParam, cardSectionList);
      setTitle(title);

      if (typeParam || dateParam) {
         updateSearchParams(typeParam, dateParam);

         dispatch(getLoftsData({ type: typeParam, page: 1, date: dateParam }));
      } else {
         /*
          * Processing for typeParam = '' case.
          */
         dispatch(getLoftsData({ type, page: 1, date }));
      }

      return () => {
         dispatch(resetCardsState());
      };
   }, [dispatch, typeParam]);

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
                        <Arrow />
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
