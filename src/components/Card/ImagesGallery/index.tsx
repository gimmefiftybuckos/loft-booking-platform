import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';

import styles from './index.module.sass';

import { ILoft } from '../../../types';
import { useDispatch, useSelector } from '../../../store';
import { setFavorite } from '../../../store/slices/favorites';
import { API_URL } from '../../../services/constants';

type TGalleryProps = {
   cardData: ILoft;
   wide?: string;
};

export const ImagesGallery: React.FC<TGalleryProps> = ({ cardData, wide }) => {
   const { favorites } = useSelector((state) => state.favorites);
   const { isAuth } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [action, setAction] = useState<'next' | 'prev' | 'idle'>('idle');

   const isFavorite = favorites?.find((item) => item === cardData.id);

   const onClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!isAuth) {
         navigate('/login');
         return;
      }

      dispatch(setFavorite(cardData.id));
   };

   const imagesArr = cardData.imageUrl.slice(0, 7);

   enum ImagesCount {
      MAX = imagesArr.length - 1,
      MIN = 0,
   }

   const [imageState, setImageState] = useState(0);

   const handleNext = (event: React.MouseEvent) => {
      event.stopPropagation();

      if (imageState !== ImagesCount.MAX && action === 'idle') {
         setAction('next');
         setTimeout(() => {
            setImageState(imageState + 1);
            setAction('idle');
         }, 350);
      }
   };

   const handlePrev = (event: React.MouseEvent) => {
      event.stopPropagation();

      if (imageState !== ImagesCount.MIN && action === 'idle') {
         setAction('prev');
         setTimeout(() => {
            setImageState(imageState - 1);
            setAction('idle');
         }, 350);
      }
   };

   const handleSelect = (event: React.MouseEvent, index: number) => {
      event.stopPropagation();

      setImageState(index);
   };
   return (
      <div className={clsx(styles.gallery, styles[`gallery${wide}`])}>
         <div onClick={onClick} className={clsx(styles.like)}>
            <div
               className={clsx(
                  styles.like__icon,
                  isFavorite && styles.like__icon_selected
               )}
            ></div>
         </div>
         <button
            onClick={handlePrev}
            className={clsx(
               styles.button,
               styles.button_left,
               imageState === ImagesCount.MIN && styles.button_hidden
            )}
         ></button>
         <button
            onClick={handleNext}
            className={clsx(
               styles.button,
               styles.button_right,
               imageState === ImagesCount.MAX && styles.button_hidden
            )}
         ></button>
         <div className={clsx(styles.container, styles[`container_${action}`])}>
            <img
               className={clsx(styles.image, styles.image_prev)}
               src={`${API_URL}/uploads/${imagesArr[imageState - 1] || imagesArr[imageState]}`}
               loading='lazy'
               alt=''
            />
            <img
               className={clsx(styles.image)}
               src={`${API_URL}/uploads/${imagesArr[imageState]}`}
               loading='lazy'
               alt=''
            />
            <img
               className={clsx(styles.image, styles.image_next)}
               src={`${API_URL}/uploads/${imagesArr[imageState + 1] || imagesArr[imageState]}`}
               loading='lazy'
               alt=''
            />
         </div>
         <div className={clsx(styles.slider)}>
            {imagesArr.map((item, index) => {
               return (
                  <button
                     key={index}
                     onClick={(event) => handleSelect(event, index)}
                     className={clsx(
                        styles.slider__item,
                        index === imageState && styles.slider__item_selected
                     )}
                  ></button>
               );
            })}
         </div>
      </div>
   );
};
