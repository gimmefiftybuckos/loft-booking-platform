import { useDispatch, useSelector } from '../../../store';
import { useContext } from 'react';
import clsx from 'clsx';

import styles from './index.module.sass';

import { ICardSection } from '../../../types';
import { cardSectionList } from '../../../services/constants';
import { setType } from '../../../store/cardCatalogSlice';

import { ModalContext } from '../../../context';
import { Button } from '../../Button';

export const SearchList = () => {
   const dispatch = useDispatch();
   const toggleModal = useContext(ModalContext);

   const cardSectionListSlice = cardSectionList.slice(2, 100);
   const { type } = useSelector((state) => state.cards);

   const onClick = (item: ICardSection) => {
      dispatch(setType(item.type));
      toggleModal ? toggleModal(-1) : null;
   };

   return (
      <ul className={clsx(styles.list)}>
         {cardSectionListSlice.map((item, index) => {
            return (
               <li key={index} className={clsx(styles.list__item)}>
                  <Button
                     onClick={() => onClick(item)}
                     className={clsx(
                        styles.list__button,
                        item.type === type && styles.list__button_selected
                     )}
                  >
                     {item.title}
                  </Button>
               </li>
            );
         })}
      </ul>
   );
};
