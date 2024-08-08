import clsx from 'clsx';
import { Button } from '../Button';
import { Text } from '../Text';

import styles from './CardContainer.module.sass';

export const CardSection = () => {
   const test = [1, 2, 3, 4, 5];

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
            <article className={clsx(styles.card)}>
               <div className={clsx(styles.card__container)}>
                  <img
                     className={clsx(styles.card__image)}
                     src='src/assets/preview.png'
                     alt=''
                  />
               </div>
               <div className={clsx(styles.card__content)}>
                  <Text size='18' weight={600} as={'h3'}>
                     Лофт из белого кирпича с верандой
                  </Text>
                  <div className={clsx(styles.card__distance)}>
                     <div className={clsx(styles.card__metro)}>
                        <Text size='14'>Бауманская</Text>
                     </div>
                     <div className={clsx(styles.card__time)}>
                        <Text color='gray' size='14'>
                           7 минут
                        </Text>
                     </div>
                  </div>
                  <div className={clsx(styles.card__rating)}>
                     <div className={clsx(styles.card__stars)}>
                        {test.map(() => (
                           <div
                              aria-hidden
                              className={clsx(styles.card__star)}
                           ></div>
                        ))}
                     </div>
                     <div className={clsx(styles.card__review)}>
                        <Text size='14'>4.0</Text>
                        <Text size='14' color='gray'>
                           (15 отзывов)
                        </Text>
                     </div>
                  </div>
                  <div className={clsx(styles.card__price)}>
                     <Text color='gray' size='14'>
                        от{' '}
                        <Text size='20' weight={600} as={'span'}>
                           3000 ₽
                        </Text>{' '}
                        / час
                     </Text>
                  </div>
               </div>
            </article>
         </div>
      </section>
   );
};
