import clsx from 'clsx';

import styles from './index.module.sass';

import { ILoftCard } from '../../types';

import { Text } from '../Text';
import { Price } from './Price';
import { Rating } from './Rating';
import { Room } from './Room';
import { Distance } from './Distance';
import { API_URL } from '../../services/constants';

type CardProps = {
   cardData: ILoftCard;
   wide?: boolean;
};

export const Card: React.FC<CardProps> = ({ cardData, wide }) => {
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

   const size = wide ? '_wide' : '';

   const template = wide ? (
      <>
         <Room wide area={area} persons={maxPersons} seats={seatingPlaces} />
         <div className={clsx(styles.details)}>
            <Price price={pricePerHour} />
            <Rating averageRating={averageRating} reviewsCount={reviewsCount} />
         </div>
      </>
   ) : (
      <>
         <Rating averageRating={averageRating} reviewsCount={reviewsCount} />
         <Price outline price={pricePerHour} />
         <Room area={area} persons={maxPersons} seats={seatingPlaces} />
      </>
   );

   return (
      <article className={clsx(styles.card, styles[`card${size}`])}>
         <div
            className={clsx(
               styles.card__container,
               styles[`card__container${size}`]
            )}
         >
            <img
               className={clsx(styles.card__image)}
               src={`${API_URL}/uploads/${imageUrl[0]}`}
               loading='lazy'
               alt=''
            />
         </div>
         <div
            className={clsx(
               styles.card__content,
               styles[`card__content${size}`]
            )}
         >
            <Text
               size={`CardTitle${wide ? '_wide' : ''}`}
               weight={600}
               as={'h3'}
            >
               {title}
            </Text>
            <Distance metro={metroStation} time={walkingDistanceMinutes} />
            {template}
         </div>
      </article>
   );
};
