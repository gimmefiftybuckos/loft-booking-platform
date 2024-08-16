import clsx from 'clsx';
import { Button } from '../_reusable/Button';
import { Text } from '../_reusable/Text';

import styles from './CardContainer.module.sass';
import { Card } from '../_reusable/Card/Card';
import { useEffect, useState } from 'react';

import { ILoftCard } from '../../types';
import { asyncGetHomeContainerData } from '../../api';

type CardSectionProps = {
   title: string;
   filter?: string;
};

export const CardSection: React.FC<CardSectionProps> = ({
   title = 'Мы рекомендуем',
   filter = '',
}) => {
   const [dataState, setDataState] = useState<ILoftCard[]>();

   const handle = async () => {
      const data = await asyncGetHomeContainerData(filter);
      setDataState(data);
   };

   useEffect(() => {
      handle();
   }, [filter]);

   const titleCards = dataState?.slice(0, 3);

   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles['section__text-container'])}>
            <Text as={'h2'} weight={700} size='24'>
               {title}
            </Text>
            <div className={clsx(styles['section__button-container'])}>
               <Button pathTo={''}>Смотреть все</Button>
               <img
                  className={clsx(styles.icon)}
                  src='src/assets/down.svg'
                  alt='Dropdown Icon'
                  width='16'
                  height='16'
               />
            </div>
         </div>
         <div className={clsx(styles['card-container'])}>
            {titleCards?.map((item, index) => {
               return <Card {...item} key={index} />;
            })}
         </div>
      </section>
   );
};
