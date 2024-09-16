import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import styles from './index.module.sass';

import { getCardsList, resetCardsState } from '../../store/cardCatalogSlice';
import {
   getTitleByFilter,
   getTitle,
   updateSearchParams,
} from '../../services/utils';

import { Text } from '../../components/ui/Text';
import { Card } from '../../components/Card';
import { SelectionButton } from '../../components/Modal/SelectionButton';
import { useModalControl } from '../../hooks/useModalControl';
import { cardSectionList, catalogFilters } from '../../services/constants';

export const Catalog = () => {
   const dispatch = useDispatch();
   const { cards, type, date, price, page, hasMore, status } = useSelector(
      (state) => state.cards
   );
   const { toggleModal, controlIndex } = useModalControl();

   const [searchParams, setSearchParams] = useSearchParams();
   const [titleState, setTitle] = useState('');

   const getInitParam = (param: string, searchParamKey: string) => {
      return (
         param || decodeURIComponent(searchParams.get(searchParamKey) || '')
      );
   };

   const [typeParam, setTypeParams] = useState(getInitParam(type, 'type'));
   const [dateParam, setDateParam] = useState(getInitParam(date, 'date'));
   const [priceParam, setPriceParam] = useState(getInitParam(price, 'price'));

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

   /*
    * This useEffect allows you to change type values from external components.
    * The re-rendering process starts when the typeParam is changed.
    * Other query parameters are not affected.
    */
   useEffect(() => {
      setTypeParams(getInitParam(type, 'type'));
      setDateParam(getInitParam(date, 'date'));
      setPriceParam(getInitParam(price, 'price'));
   }, [type, date, price]);

   /*
    * Basic handler for the CatalogSection component.
    */
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
      <>
         <div
            className={clsx(
               styles.buttons,
               controlIndex !== -1 && styles.buttons_focus
            )}
         >
            {catalogFilters.map((item, index) => {
               return (
                  <SelectionButton
                     key={index}
                     title={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={controlIndex === index}
                     currentValue={getTitleByFilter(item) || null}
                     catalogStyles
                  />
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
      </>
   );
};
