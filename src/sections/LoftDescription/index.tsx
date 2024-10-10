import clsx from 'clsx';

import styles from './index.module.sass';

import { Distance } from '../../components/Card/Distance';
import { Rating } from '../../components/Card/Rating';
import { Room, RoomInfoVariant } from '../../components/Card/Room';
import { Preloader } from '../../components/ui/Preloader';
import { useSelector } from '../../store';
import { Text } from '../../components/ui/Text';

export const LoftDescription = () => {
   const { card } = useSelector((state) => state.cards);

   if (!card) {
      return <Preloader />;
   }

   return (
      <section className={styles.text}>
         <div className={clsx(styles.text__info)}>
            <Text size='32' weight={700} as='h1'>
               {card?.title}
            </Text>
            <Rating
               reviewsCount={card?.reviewsCount}
               averageRating={card?.averageRating}
            />
            <Distance
               metro={card?.metroStation}
               time={card?.walkingDistanceMinutes}
            />
            <Room
               variant={RoomInfoVariant.PAGE}
               area={card?.area}
               persons={card?.maxPersons}
               seats={card?.seatingPlaces}
            />
         </div>
         <Text
            className={clsx(styles.text__title)}
            size='24'
            weight={500}
            as='h2'
         >
            О месте PLACEHOLDER
         </Text>
         <div className={clsx(styles.text__content)}>
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
               Помещение оснащено дополнительными комнатами (гримерная и склад),
               где вы можете сложить свои декорации и переодеться для
               мероприятия.
            </Text>
            <Text as='p'>
               Для вас и ваших гостей будет предоставлена бесплатная парковка на
               10 автомобилей. Те, кто добираются своим ходом могут с легкостью
               дойти до лофта за 8-10 минут от метро Бутырская. Такие неудобства
               как КПП, проходные и бесконечные поиски нужного корпуса -
               отсутствуют.
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
               51-80 чел - 20.000 р. 81-120 чел - 25.000 р. 121-150 чел - 30.000
               р.
            </Text>
            <Text as='p'>
               Условия возврата денег: при отмене мероприятия менее чем за : -15
               дней до даты проведения - возврат 75% -7 дней до даты проведения
               - возврат 50% -5 дней до даты проведения - предоплата не
               возвращается
            </Text>
         </div>
      </section>
   );
};
