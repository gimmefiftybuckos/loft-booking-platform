import clsx from 'clsx';

import styles from './index.module.sass';

import { ILoftCard } from '../../types';
import { API_URL } from '../../services/constants';

import { Text } from '../ui/Text';
import { Price } from './Price';
import { Rating } from './Rating';
import { Room } from './Room';
import { Distance } from './Distance';
import { useNavigate } from 'react-router-dom';

type CardProps = {
   cardData: ILoftCard;
   wide?: boolean;
};

export const Card: React.FC<CardProps> = ({ cardData, wide }) => {
   const navigate = useNavigate();

   const onClick = () => {
      navigate(`/catalog/${cardData.id}`);
   };

   const size = wide ? '_wide' : '';

   const template = wide ? (
      <>
         <Room
            wide
            area={cardData.area}
            persons={cardData.maxPersons}
            seats={cardData.seatingPlaces}
         />
         <div className={clsx(styles.details)}>
            <Price price={cardData.pricePerHour} />
            <Rating
               averageRating={cardData.averageRating}
               reviewsCount={cardData.reviewsCount}
            />
         </div>
      </>
   ) : (
      <>
         <Rating
            averageRating={cardData.averageRating}
            reviewsCount={cardData.reviewsCount}
         />
         <Price outline price={cardData.pricePerHour} />
         <Room
            area={cardData.area}
            persons={cardData.maxPersons}
            seats={cardData.seatingPlaces}
         />
      </>
   );

   return (
      <article
         onClick={() => onClick()}
         className={clsx(styles.card, styles[`card${size}`])}
      >
         <div
            className={clsx(
               styles.card__container,
               styles[`card__container${size}`]
            )}
         >
            <img
               className={clsx(styles.card__image)}
               src={`${API_URL}/uploads/${cardData.imageUrl[0]}`}
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
               className={clsx(styles.title, wide && styles.title_wide)}
               weight={600}
               as={'h3'}
            >
               {cardData.title}
            </Text>
            <Distance
               metro={cardData.metroStation}
               time={cardData.walkingDistanceMinutes}
            />
            {template}
         </div>
      </article>
   );
};
