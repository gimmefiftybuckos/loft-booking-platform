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

   const descriptionStrings = card.description.split('\n');

   return (
      <section className={styles.content}>
         <div className={clsx(styles.content__info)}>
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
            className={clsx(styles.content__title)}
            size='24'
            weight={500}
            as='h2'
         >
            О месте
         </Text>
         <div className={clsx(styles.content__description)}>
            <Text as='p'>Debug id: {card.id}</Text>
            {descriptionStrings.map((item, index) => (
               <Text key={index} as='p' weight={400}>
                  {`${item} ${index}`}
                  {/* {item} */}
               </Text>
            ))}
         </div>
      </section>
   );
};
