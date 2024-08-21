import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './CardSection.module.sass';

import { FilterParamsType, ILoftCard } from '../../../types';
import { asyncGetHomeContainerData } from '../../../api';
import { AppDispatch } from '../../../store';
import { setFilter } from '../../../store/cardCatalogSlice';

import { Text } from '../../_reusable/Text';
import { Button } from '../../_reusable/Button';
import { Card } from '../../_reusable/Card/Card';

type CardSectionProps = {
   title?: string;
   filter?: FilterParamsType;
};

export const CardSection: React.FC<CardSectionProps> = ({
   title = 'Мы рекомендуем',
   filter = '',
}) => {
   const [dataState, setDataState] = useState<ILoftCard[]>();

   const dispatch = useDispatch<AppDispatch>();

   const initalHomeCards = async () => {
      const data = await asyncGetHomeContainerData(filter);
      setDataState(data);
   };

   useEffect(() => {
      initalHomeCards();
   }, [filter]);

   const clickHandle = () => {
      dispatch(setFilter(filter));
   };

   const titleCards = dataState?.slice(0, 3);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles['section__text-container'])}>
            <Text as={'h2'} weight={700} size='24'>
               {title}
            </Text>
            <div className={clsx(styles['section__button-container'])}>
               <Button onClick={clickHandle} pathTo={'/catalog'}>
                  Смотреть все
               </Button>
               <img
                  className={clsx(styles.icon)}
                  src='/assets/down.svg'
                  alt='Dropdown Icon'
                  width='16'
                  height='16'
               />
            </div>
         </div>
         <div className={clsx(styles['card-container'])}>
            {titleCards?.map((item) => {
               return <Card cardData={item} key={item.id} />;
            })}
         </div>
      </section>
   );
};
