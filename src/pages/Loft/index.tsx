import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { ILoftCard } from '../../types';
import { getLoftApi } from '../../services/api';
import { API_URL, selectionFilters } from '../../services/constants';

import { Text } from '../../components/ui/Text';
import { Rating } from '../../components/Card/Rating';
import { Distance } from '../../components/Card/Distance';
import { Room, RoomInfoVariant } from '../../components/Card/Room';
import {
   SelectionButton,
   SelectionVariant,
} from '../../components/Modal/SelectionButton';
import { Button } from '../../components/Button';
import { ButtonVariant } from '../../components/Button';
import { useModalControl } from '../../hooks/useModalControl';

export const Loft = () => {
   const { pathname } = useLocation();
   const [loftState, setLoftState] = useState<ILoftCard>();
   const { closeModal, toggleModal, controlIndex } = useModalControl();
   const id = pathname.split('/')[2];

   const fetchData = async () => {
      const data = await getLoftApi(id);
      setLoftState(data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const coverImages = loftState?.imageUrl.slice(0, 5);

   if (!loftState) {
      return <p>Loading...</p>;
   }

   return (
      <>
         <section className={clsx(styles.images)}>
            <div className={clsx(styles.container)}>
               {coverImages?.map((item, index) => {
                  return (
                     <img
                        key={index}
                        className={clsx(styles.image)}
                        src={`${API_URL}/uploads/${item}`}
                        loading='lazy'
                        alt=''
                     />
                  );
               })}
            </div>
         </section>
         <section className={styles.content}>
            <div className={clsx(styles.text)}>
               <Text size='32' weight={700} as='h1'>
                  {loftState?.title}
               </Text>
               <Rating
                  reviewsCount={loftState?.reviewsCount}
                  averageRating={loftState?.averageRating}
               />
               <Distance
                  metro={loftState?.metroStation}
                  time={loftState?.walkingDistanceMinutes}
               />
               <Room
                  variant={RoomInfoVariant.PAGE}
                  area={loftState?.area}
                  persons={loftState?.maxPersons}
                  seats={loftState?.seatingPlaces}
               />
               <Text size='24' weight={500} as='h2'>
                  О месте PLACEHOLDER
               </Text>
               <Text as='p'>
                  Это пространство, которое позволяет провести любое ваше
                  мероприятие. 340 квадратных метров, большие панорамные окна,
                  дизайнерская мебель, выход на балкон, парковка- это то, что
                  сделает ваше событие комфортным и запоминающимся! У нас нет
                  ограничений по шуму!
               </Text>
               <Text as='p'>Мы открыты к любым вашим предложениям.</Text>
               <Text as='p'>
                  Если у вас есть нестандартная задумка - предлагаем вам
                  реализовать ее вместе с нами!
               </Text>
               <Text as='p'>
                  Помещение оснащено дополнительными комнатами (гримерная и
                  склад), где вы можете сложить свои декорации и переодеться для
                  мероприятия.
               </Text>
               <Text as='p'>
                  Для вас и ваших гостей будет предоставлена бесплатная парковка
                  на 10 автомобилей. Те, кто добираются своим ходом могут с
                  легкостью дойти до лофта за 8-10 минут от метро Бутырская.
                  Такие неудобства как КПП, проходные и бесконечные поиски
                  нужного корпуса - отсутствуют.
               </Text>
               <Text as='p'>
                  Помимо аренды мы можем предложить вам помощь в создании самого
                  мероприятия. От поиска ведущего и подрядчиков до полной
                  организации мероприятия.
               </Text>
               <Text as='p'>Наценка от 100 человек +25% к стоимости!</Text>
               <Text as='p'>
                  Уборка после мероприятия входит в стоимость. Отдельно
                  оплачивается уборка после бумажного шоу и конфетти - 3000 р.
                  Ограничение по бумажному шоу - до 20 кг бумаги
               </Text>
               <Text as='p'>
                  Депозит: (возвращается после мероприятия) 0-50 чел - 15.000 р.
                  51-80 чел - 20.000 р. 81-120 чел - 25.000 р. 121-150 чел -
                  30.000 р.
               </Text>
               <Text as='p'>
                  Условия возврата денег: при отмене мероприятия менее чем за :
                  -15 дней до даты проведения - возврат 75% -7 дней до даты
                  проведения - возврат 50% -5 дней до даты проведения -
                  предоплата не возвращается
               </Text>
            </div>
            <article className={clsx(styles.article)}>
               {selectionFilters.map((item, index) => (
                  <SelectionButton
                     key={index}
                     title={item}
                     index={index}
                     onClick={toggleModal}
                     isActive={controlIndex === index}
                     currentValue={null}
                     variant={SelectionVariant.MAIN}
                  />
               ))}

               <Button
                  as={Link}
                  pathTo='/catalog'
                  variant={ButtonVariant.ACCENT}
                  onClick={closeModal}
                  className={clsx(styles.button)}
               >
                  Найти
               </Button>
            </article>
         </section>
      </>
   );
};
