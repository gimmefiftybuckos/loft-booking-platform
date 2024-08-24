import clsx from 'clsx';
import { cardSectionList } from '../../utils';

import styles from './SearchList.module.sass';

export const SearchList = () => {
   const toSearchFilter = cardSectionList.slice(2, 100);

   return (
      <ul className={clsx(styles.list)}>
         {toSearchFilter.map((item) => {
            return (
               <li className={clsx(styles.list__item)}>
                  <button className={clsx(styles.list__button)}>
                     {item.title}
                  </button>
               </li>
            );
         })}
      </ul>
   );
};
