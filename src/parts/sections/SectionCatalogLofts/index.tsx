import InfiniteScroll from 'react-infinite-scroll-component';
import { Text } from '../../../components/ui/Text';
import clsx from 'clsx';

import styles from './index.module.sass';
import { Card } from '../../../components/Card';
import { useDispatch, useSelector } from '../../../store';
import { useEffect, useRef, useState } from 'react';
import { getTitle, updateSearchParams } from '../../../services/utils';
import {
   getCardsList,
   resetCardsState,
} from '../../../store/slices/cardCatalog';
import { cardSectionList } from '../../../services/constants';
import { Preloader } from '../../../components/ui/Preloader';
import { ILoftCard } from '../../../types';

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
   const [cardsState, setCardsState] = useState<ILoftCard[]>(cards);

   const isDelayed = useRef(false);

   const { typeParam, dateParam, priceParam } = params;

   const fetchMore = () => {
      if (status !== 'loading' && hasMore) {
         isDelayed.current = true;
         dispatch(
            getCardsList({
               type: typeParam,
               page,
               date: dateParam,
               price: priceParam,
            })
         ).catch((error) => console.error(error));
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

   useEffect(() => {
      if (!isDelayed.current) {
         const timer = setTimeout(() => {
            setCardsState(cards);
         }, 200);
         return () => clearTimeout(timer);
      } else {
         setCardsState(cards);
         isDelayed.current = false;
      }
   }, [cards]);

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
               loader={
                  status !== 'failed' ? (
                     <>
                        <Preloader />
                        <Preloader />
                     </>
                  ) : (
                     <Text>Server Error</Text>
                  )
               }
               dataLength={cardsState.length}
            >
               {cardsState.map((item) => (
                  <Card key={item.id} wide cardData={item} />
               ))}
            </InfiniteScroll>
         </div>
      </section>
   );
};
