import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './CardBlockSection.module.sass';

import { ICardSection } from '../../types';
import { AppDispatch } from '../../store';
import { setFilter } from '../../store/cardCatalogSlicee';

import { Text } from '../_reusable/Text';

type CardBlockSectionProps = {
   data: ICardSection[];
};

export const CardBlockSection: React.FC<CardBlockSectionProps> = ({ data }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

   const clickHandle = useCallback((filter: string) => {
      navigate('/catalog');
      dispatch(setFilter(filter));
   }, []);

   return (
      <section>
         <Text as={'h2'} weight={700} size='24'>
            Любой тип площадки
         </Text>
         <div className={clsx(styles.container)}>
            {data.map((item, index) => {
               const { title, param } = item;

               return (
                  <div
                     onClick={() => clickHandle(param)}
                     key={index}
                     className={clsx(styles.card)}
                  >
                     <img
                        className={clsx(styles.card__image)}
                        src={`/assets/block-section/${param || 'all'}.png`}
                        alt=''
                     />
                     <p className={clsx(styles.card__text)}>{title}</p>
                  </div>
               );
            })}
         </div>
      </section>
   );
};
