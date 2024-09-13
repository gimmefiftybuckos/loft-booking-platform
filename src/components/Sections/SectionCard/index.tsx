import { useDispatch } from '../../../store';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './index.module.sass';

import { TypeParamsType, ILoftCard } from '../../../types';
import { setType } from '../../../store/cardCatalogSlice';

import { Text } from '../../Text';
import { Button } from '../../Button';
import { Card } from '../../Card';
import { getCardsApi } from '../../../services/api';
import { Link } from 'react-router-dom';

type CardSectionProps = {
   title?: string;
   type?: TypeParamsType;
};

export const CardSection: React.FC<CardSectionProps> = ({
   title = 'Мы рекомендуем',
   type = '',
}) => {
   const [dataState, setDataState] = useState<ILoftCard[]>();

   const dispatch = useDispatch();

   const initalHomeCards = async () => {
      const data = await getCardsApi({ type });
      setDataState(data);
   };

   useEffect(() => {
      initalHomeCards();
   }, [type]);

   const clickHandle = () => {
      dispatch(setType(type));
   };

   const titleCards = dataState?.slice(0, 3);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles['section__text-container'])}>
            <Text as={'h2'} weight={700} size='24'>
               {title}
            </Text>
            <div className={clsx(styles['section__button-container'])}>
               <Button as={Link} pathTo='/catalog' onClick={clickHandle}>
                  Смотреть все
               </Button>
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
