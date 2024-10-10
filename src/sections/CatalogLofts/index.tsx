import { useEffect, useRef, useState } from 'react';

import { ILoft } from '../../types';
import { getTitle, updateSearchParams } from '../../services/utils';
import { useDispatch, useSelector } from '../../store';
import { cardSectionList } from '../../services/constants';

import { getCardsList, resetCardsState } from '../../store/slices/cardCatalog';
import { CardsList } from '../../components/CardsList';

type TQuerryParams = Record<string, string>;

type TCatalogLofts = {
   params: TQuerryParams;
   setSearchParams: (
      params: TQuerryParams,
      setting: { replace: boolean }
   ) => void;
};

export const CatalogLofts = ({ params, setSearchParams }: TCatalogLofts) => {
   const dispatch = useDispatch();
   const { cards, page, hasMore, status } = useSelector((state) => state.cards);

   const [titleState, setTitle] = useState('');
   const [loftsState, setLoftsState] = useState<ILoft[]>(cards);

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
            setLoftsState(cards);
         }, 200);
         return () => clearTimeout(timer);
      } else {
         setLoftsState(cards);
         isDelayed.current = false;
      }
   }, [cards]);

   return (
      <section>
         <CardsList
            title={titleState}
            fetchMore={fetchMore}
            hasMore={hasMore}
            loftsState={loftsState}
            status={status}
         />
      </section>
   );
};
