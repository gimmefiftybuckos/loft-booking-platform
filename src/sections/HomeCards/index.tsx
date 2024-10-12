import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from '../../store';
import clsx from 'clsx';

import styles from './index.module.sass';

import { TypeParamsType, ILoft } from '../../types';
import { catchError, getAllLoftsApi } from '../../services/api';
import { setType } from '../../store/slices/cardCatalog';

import { Text } from '../../components/ui/Text';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Preloader } from '../../components/ui/Preloader';

type CardSectionProps = {
   title?: string;
   type?: TypeParamsType;
};

export const HomeCards: React.FC<CardSectionProps> = ({
   title = 'Мы рекомендуем',
   type = '',
}) => {
   const [dataState, setDataState] = useState<ILoft[]>();
   const [errorState, setErrorState] = useState<AxiosError>();

   const dispatch = useDispatch();

   const initalHomeCards = async () => {
      try {
         const data = await getAllLoftsApi({ type });

         setDataState(data);
      } catch (error) {
         setErrorState(error as AxiosError);
         catchError(error);
         throw error;
      }
   };

   useEffect(() => {
      initalHomeCards();
   }, []);

   const clickHandle = () => {
      dispatch(setType(type));
   };

   const titleCards = dataState?.slice(0, 3);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles['section__text-container'])}>
            <Text
               className={clsx(styles.title)}
               as={'h2'}
               weight={700}
               size='24'
            >
               {title}
            </Text>
            <div className={clsx(styles['section__button-container'])}>
               <Button as={Link} pathTo='/catalog' onClick={clickHandle}>
                  Смотреть все
               </Button>
            </div>
         </div>
         <div className={clsx(styles['card-container'])}>
            {!errorState && !dataState?.length && <Preloader />}
            {errorState && <Text>Server Error</Text>}
            {titleCards?.map((item) => {
               return <Card cardData={item} key={item.id} />;
            })}
         </div>
      </section>
   );
};
