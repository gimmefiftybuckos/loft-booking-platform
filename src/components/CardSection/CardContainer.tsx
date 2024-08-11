import clsx from 'clsx';
import { Button } from '../_reusable/Button';
import { Text } from '../_reusable/Text';

import styles from './CardContainer.module.sass';
import { Card } from '../_reusable/Card/Card';

export const CardSection = () => {
   return (
      <section className={clsx(styles.section)}>
         <div className={clsx(styles['section__text-container'])}>
            <Text as={'h2'} weight={700} size='24'>
               Мы рекомендуем
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
            <Card />
            <Card />
            <Card />
         </div>
      </section>
   );
};
