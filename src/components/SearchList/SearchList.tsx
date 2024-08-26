import clsx from 'clsx';
import { cardSectionList } from '../../utils';

import styles from './SearchList.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setToSearchType } from '../../store/cardCatalogSlice';
import { useContext } from 'react';
import { ModalContext } from '../_sections/MainSection/MainSection';
import { ICardSection } from '../../types';

export const SearchList = () => {
   const dispatch = useDispatch<AppDispatch>();
   const toggleModal = useContext(ModalContext);

   const cardSectionListSlice = cardSectionList.slice(2, 100);
   const { toSearchType } = useSelector((state: RootState) => state.cards);

   const onClick = (item: ICardSection) => {
      dispatch(setToSearchType(item.type));
      toggleModal ? toggleModal(-1) : null;
   };

   return (
      <ul className={clsx(styles.list)}>
         {cardSectionListSlice.map((item, index) => {
            return (
               <li key={index} className={clsx(styles.list__item)}>
                  <button
                     onClick={() => onClick(item)}
                     className={clsx(
                        styles.list__button,
                        item.type === toSearchType
                           ? styles.list__button_selected
                           : null
                     )}
                  >
                     {item.title}
                  </button>
               </li>
            );
         })}
      </ul>
   );
};
