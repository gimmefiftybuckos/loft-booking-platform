import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import styles from './index.module.sass';

import { getCardsList, resetCardsState } from '../../../store/cardCatalogSlice';
import {
   cardSectionList,
   catalogFilters,
   getTitleByFilter,
   getValueByAnother,
} from '../../../services/utils';

import { Text } from '../../Text';
import { Card } from '../../Card';
import { SelectionButton } from '../../Modal/SelectionButton';
import { useModalControl } from '../../../hooks/useModalControl';
import { Backdrop } from '../../Backdrop';

export const CatalogSection = () => {
   const dispatch = useDispatch();
   const { cards, type, date, price, page, hasMore, status } = useSelector(
      (state) => state.cards
   );
   const { toggleModal, controlIndex } = useModalControl();

   const [searchParams, setSearchParams] = useSearchParams();
   const [titleState, setTitle] = useState('');

   const initialTypeParam = type || searchParams.get('type') || '';
   const [typeParam, setTypeParams] = useState(initialTypeParam);

   const initialDateParam =
      date || decodeURIComponent(searchParams.get('date') || '');
   const [dateParam, setDateParam] = useState(initialDateParam);

   const initalPriceParam =
      price || decodeURIComponent(searchParams.get('price') || '');
   const [priceParam, setPriceParam] = useState(initalPriceParam);

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
    * Inital query parameters method
    */
   const updateSearchParams = (type: string, date: string, price: string) => {
      const params: Record<string, string> = {};
      if (type) params.type = type;
      if (date) params.date = encodeURIComponent(date);
      if (price) params.price = encodeURIComponent(price);
      setSearchParams(params, { replace: true });
   };

   /*
    * This useEffect allows you to change type values from external components.
    * The re-rendering process occurs when the typeParam is changed.
    * Other query parameters are not affected.
    */
   useEffect(() => {
      setTypeParams(type || searchParams.get('type') || '');
      setDateParam(date || decodeURIComponent(searchParams.get('date') || ''));
      setPriceParam(
         price || decodeURIComponent(searchParams.get('price') || '')
      );
   }, [type, date, price]);

   /*
    * Basic handler for the CatalogSection component.
    */
   useEffect(() => {
      const title = getValueByAnother(typeParam, cardSectionList);
      setTitle(title);

      if (typeParam || dateParam || priceParam) {
         updateSearchParams(typeParam, dateParam, priceParam);

         dispatch(
            getCardsList({
               type: typeParam,
               page: 1,
               date: dateParam,
               price: priceParam,
            })
         );
      } else {
         /*
          * Processing for typeParam = '' && dateParam = '' && priceParam = '' case.
          */
         dispatch(getCardsList({ type, page: 1, date, price }));
      }

      return () => {
         dispatch(resetCardsState());
      };
   }, [dispatch, typeParam, dateParam, priceParam]);

   return (
      <>
         <Backdrop />
         <section className={clsx(styles.section)}>
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
         </section>
      </>
   );
};
