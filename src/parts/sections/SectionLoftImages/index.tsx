import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { useSelector } from '../../../store';
import { API_URL } from '../../../services/constants';
import { useModalControl } from '../../../hooks/useModalControl';
import { Button } from '../../../components/Button';

export const SectionLoftImages = () => {
   const { toggleModal, setCurImageIndex, curImageIndex, closeModal } =
      useModalControl();
   const { card } = useSelector((state) => state.cards);

   const [searchParams, setSearchParams] = useSearchParams();
   const [imagesState, setImagesState] = useState<string[]>([]);

   const updateSearchParam = (
      key: string,
      value: string | null,
      options = { replace: true }
   ) => {
      setSearchParams((prevParams) => {
         const newParams = new URLSearchParams(prevParams);
         if (value) {
            newParams.set(key, value);
         } else {
            newParams.delete(key);
         }
         return newParams;
      }, options);
   };

   useEffect(() => {
      updateSearchParam('image', curImageIndex.toString());
   }, [curImageIndex]);

   useEffect(() => {
      if (parseInt(searchParams.get('image') || '-1') < 0) {
         updateSearchParam('image', null);
      }
   }, [searchParams]);

   useEffect(() => {
      const imageIndex = searchParams.get('image');
      if (imageIndex) {
         setCurImageIndex(parseInt(imageIndex, 10));
         toggleModal(1);
      }

      return () => {
         closeModal();
      };
   }, []);

   useEffect(() => {
      if (card?.imageUrl) {
         setImagesState(card?.imageUrl.slice(0, 5));
      }
   }, [card]);

   if (!card?.imageUrl) {
      return null;
   }

   const handleImageClick = (index: number) => {
      setCurImageIndex(index);
      toggleModal(index);
   };

   const handleMore = () => {
      setImagesState(card.imageUrl);
   };

   const moreButtonValue = card?.imageUrl?.length - imagesState?.length;

   return (
      <section className={clsx(styles.images)}>
         <div className={clsx(styles.container)}>
            {imagesState?.map((item, index) => {
               return (
                  <img
                     key={index}
                     onClick={() => {
                        handleImageClick(index);
                     }}
                     className={clsx(styles.image)}
                     src={`${API_URL}/catalog/uploads/${item}`}
                     loading='lazy'
                     alt=''
                  />
               );
            })}
         </div>
         {moreButtonValue > 0 && (
            <Button
               onClick={handleMore}
               className={clsx(styles.button)}
            >{`Показать еще ${moreButtonValue}`}</Button>
         )}
      </section>
   );
};
