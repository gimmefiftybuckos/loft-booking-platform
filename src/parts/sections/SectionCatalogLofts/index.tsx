import InfiniteScroll from 'react-infinite-scroll-component';
import { Text } from '../../../components/ui/Text';
import clsx from 'clsx';

import styles from './index.module.sass';
import { Card } from '../../../components/Card';
import { useDispatch, useSelector } from '../../../store';
import { useEffect, useState } from 'react';
import { getTitle, updateSearchParams } from '../../../services/utils';
import { getCardsList, resetCardsState } from '../../../store/cardCatalogSlice';
import { cardSectionList } from '../../../services/constants';

type TQuerryParams = Record<string, string>;

type TCatalogLofts = {
   params: TQuerryParams;
   setSearchParams: (
      params: TQuerryParams,
      setting: { replace: boolean }
   ) => void;
};

export const SectionCatalogLofts = ({
   params,
   setSearchParams,
}: TCatalogLofts) => {
   const dispatch = useDispatch();
   const { cards, page, hasMore, status } = useSelector((state) => state.cards);

   const [titleState, setTitle] = useState('');

   const { typeParam, dateParam, priceParam } = params;

   const fetchMore = () => {
      if (status !== 'loading' && hasMore) {
         dispatch(
            getCardsList({
               type: typeParam,
               page,
               date: dateParam,
               price: priceParam,
            })
         );
      }
   };

   useEffect(() => {
      const title = getTitle(typeParam, cardSectionList);
      setTitle(title);
      const queryParams = updateSearchParams(typeParam, dateParam, priceParam);
      setSearchParams(queryParams, { replace: true });

      dispatch(
         getCardsList({
            type: typeParam,
            page: 1,
            date: dateParam,
            price: priceParam,
         })
      );

      return () => {
         dispatch(resetCardsState());
      };
   }, [dispatch, typeParam, dateParam, priceParam]);

   return (
      <section>
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
