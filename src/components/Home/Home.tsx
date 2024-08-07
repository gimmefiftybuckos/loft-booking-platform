import clsx from 'clsx';
import styles from './Home.module.sass';
import { Button } from '../Button';
import { Text } from '../Text';

export const Home = () => {
   return (
      <>
         <section className={clsx(styles['cover-container'])}>
            <h1 className={clsx(styles.title)}>
               Более 500 площадок для вашего мероприятия
            </h1>
            <div className={clsx(styles.container)}>
               <button className={clsx(styles.button)}>
                  Тип мероприятий
                  <img
                     src='src/assets/down.svg'
                     alt='Dropdown Icon'
                     width='16'
                     height='16'
                  />
               </button>

               <button className={clsx(styles.button)}>
                  Дата мероприятий
                  <img
                     src='src/assets/down.svg'
                     alt='Dropdown Icon'
                     width='16'
                     height='16'
                  />
               </button>
               <button className={clsx(styles.button, styles.button_smaller)}>
                  Начало
                  <img
                     src='src/assets/down.svg'
                     alt='Dropdown Icon'
                     width='16'
                     height='16'
                  />
               </button>

               <button className={clsx(styles.button, styles.button_smaller)}>
                  Конец
                  <img
                     src='src/assets/down.svg'
                     alt='Dropdown Icon'
                     width='16'
                     height='16'
                  />
               </button>

               <Button textColor='white' accented pathTo={''}>
                  Найти
               </Button>
            </div>
         </section>
         <section className={clsx(styles.section)}>
            <ul className={clsx(styles['banner-list'])}>
               <li className={clsx(styles.banner)}>
                  <img src='src/assets/discount.svg' alt='Discount icon' />
                  <Text size='14'>
                     <Text size='14' as={'span'} weight={800}>
                        Без комиссии —{' '}
                     </Text>
                     не переплачивайте за аренду
                  </Text>
               </li>
               <li className={clsx(styles.banner)}>
                  <img src='src/assets/discount.svg' alt='Discount icon' />
                  <Text size='14'>
                     <Text size='14' as={'span'} weight={800}>
                        Без комиссии —{' '}
                     </Text>
                     не переплачивайте за аренду
                  </Text>
               </li>
               <li className={clsx(styles.banner)}>
                  <img src='src/assets/discount.svg' alt='Discount icon' />
                  <Text size='14'>
                     <Text size='14' as={'span'} weight={800}>
                        Без комиссии —{' '}
                     </Text>
                     не переплачивайте за аренду
                  </Text>
               </li>
            </ul>
         </section>
      </>
   );
};
