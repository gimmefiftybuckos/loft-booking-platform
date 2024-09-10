import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { AppDispatch, RootState } from '../../../store';
import clsx from 'clsx';

import styles from './index.module.sass';

import { ICardSection } from '../../../types';
import { cardSectionList } from '../../../services/utils';

import { setType } from '../../../store/cardCatalogSlice';
import { ModalContext } from '../../../context';
import { Text } from '../../Text';

export const SearchList = () => {
   const dispatch = useDispatch<AppDispatch>();
   const toggleModal = useContext(ModalContext);

   const cardSectionListSlice = cardSectionList.slice(2, 100);
   const { type } = useSelector((state: RootState) => state.cards);

   const onClick = (item: ICardSection) => {
      dispatch(setType(item.type));
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
                        item.type === type ? styles.list__button_selected : null
                     )}
                  >
                     {item.title}
                     {item.type !== type && (
                        <Text size='14' color='gray' as={'span'}>
                           10
                        </Text>
                     )}
                  </button>
               </li>
            );
         })}
      </ul>
   );
};
