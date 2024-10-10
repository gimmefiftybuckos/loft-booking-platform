import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { ILoft } from '../../types';

import { Text } from '../ui/Text';
import { Price } from './Price';
import { Rating } from './Rating';
import { Room, RoomInfoVariant } from './Room';
import { Distance } from './Distance';
import { ImagesGallery } from './ImagesGallery';
import { useDispatch } from '../../store';
import { getLoft } from '../../store/slices/cardCatalog';

type CardProps = {
   cardData: ILoft;
   wide?: boolean;
};

export const Card: React.FC<CardProps> = ({ cardData, wide }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const size = wide ? '_wide' : '';

   const template = wide ? (
      <>
         <Room
            variant={size && RoomInfoVariant.CATALOG}
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

   const onClick = () => {
      dispatch(getLoft(cardData.id));
      setTimeout(() => {
         navigate(`/catalog/${cardData.id}`);
      }, 100);
   };

   return (
      <article
         onClick={onClick}
         className={clsx(styles.card, styles[`card${size}`])}
      >
         <ImagesGallery cardData={cardData} wide={size} />
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
