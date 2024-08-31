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
   getTitleByFilter,
   getValueByAnother,
} from '../../../utils';

import { Text } from '../../_reusable/Text';
import { Card } from '../../_reusable/Card';
import { SelectionButton } from '../../_reusable/SelectionButton';
import { useModalControl } from '../../../hooks/useModalControl';
import { ModalBackdrop } from '../../_reusable/ModalBackdrop';

export const CatalogSection = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { cards, type, date, page, hasMore, status } = useSelector(
      (state: RootState) => state.cards
   );
   const { toggleModal, controlIndex } = useModalControl();

   const [searchParams, setSearchParams] = useSearchParams();
   const [titleState, setTitle] = useState('');

   const initialTypeParam = type || searchParams.get('type') || '';
   const [typeParam, setTypeParams] = useState(initialTypeParam);

   const initialDateParam =
      encodeURIComponent(date) ||
      decodeURIComponent(searchParams.get('date') || '');
   const [dateParam, setDateParam] = useState(initialDateParam);

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
      setDateParam(date || decodeURIComponent(searchParams.get('date') || ''));
   }, [type, date]);

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
          * Processing for typeParam = '' && dateParam = '' case.
          */
         dispatch(getLoftsData({ type, page: 1, date }));
      }

      return () => {
         dispatch(resetCardsState());
      };
   }, [dispatch, typeParam, dateParam]);

   return (
      <>
         <ModalBackdrop />
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
