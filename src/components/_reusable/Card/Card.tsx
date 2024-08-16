import clsx from 'clsx';

import styles from './Card.module.sass';

import { Text } from '../Text';
import { Price } from '../Price';
import { Rating } from '../Rating';
import { Room } from '../Room';
import { Distance } from '../Distance';
import { ILoftCard } from '../../../types';

export const Card: React.FC<ILoftCard> = (cardData) => {
   const {
      title,
      imageUrl,
      metroStation,
      walkingDistanceMinutes,
      reviewsCount,
      averageRating,
      pricePerHour,
      area,
      maxPersons,
      seatingPlaces,
   } = cardData;

   return (
      <article className={clsx(styles.card)}>
         <div className={clsx(styles.card__container)}>
            <img
               className={clsx(styles.card__image)}
               src={`http://localhost:3000/uploads/${imageUrl}`}
               loading='lazy'
               alt=''
            />
         </div>
         <div className={clsx(styles.card__content)}>
            <Text size='CardTitle' weight={600} as={'h3'}>
               {title}
            </Text>
            <Distance metro={metroStation} time={walkingDistanceMinutes} />
            <Rating averageRating={averageRating} reviewsCount={reviewsCount} />
            <Price price={pricePerHour} />
            <Room area={area} persons={maxPersons} seats={seatingPlaces} />
         </div>
      </article>
   );
};
