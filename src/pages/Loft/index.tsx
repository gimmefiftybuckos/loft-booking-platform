import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { useDispatch, useSelector } from '../../store';
import { useModalControl } from '../../hooks/useModalControl';
import { getLoft } from '../../store/slices/cardCatalog';

import { Modal, ModalTypes } from '../../features/modal/Modal';
import { LoftImages } from '../../sections/LoftImages';
import { LoftDescription } from '../../sections/LoftDescription';
import { ModalContent } from '../../features/modal/ModalContent';
import { LoftComments } from '../../sections/LoftComments';
import { Text } from '../../components/ui/Text';
import { Button, ButtonVariant } from '../../components/Button';
import { RatingSelector } from '../../components/RatingSelector';
import {
   getComments,
   setComment,
   setReview,
} from '../../store/slices/comments';
import { Preloader } from '../../components/ui/Preloader';

export const Loft = () => {
   const { pathname } = useLocation();
   const { controlIndex, closeModal } = useModalControl();
   const dispatch = useDispatch();
   const { card } = useSelector((state) => state.cards);
   const { userRating, userReview, comments } = useSelector(
      (state) => state.comments
   );

   const loftId = pathname.split('/')[2];

   useEffect(() => {
      dispatch(getComments(loftId));

      if (!card) {
         dispatch(getLoft(loftId));
      }
   }, []);

   if (!card) {
      return <Preloader className={clsx(styles.preloader)} />;
   }

   const onSave = () => {
      dispatch(
         setComment({
            loftId: loftId,
            userRating: userRating,
            userReview: userReview,
         })
      );
      closeModal();
   };

   return (
      <>
         <Modal
            className={clsx(styles.modal, styles.modal__images)}
            isOpen={controlIndex >= 0 && controlIndex < 100}
         >
            <ModalContent name={'Images'} />
         </Modal>
         <Modal
            className={clsx(styles.modal, styles.modal__review)}
            isOpen={controlIndex === ModalTypes.REVIEW}
         >
            <div className={clsx(styles.content)}>
               <div className={clsx(styles.content__cover)}></div>
               <div className={clsx(styles.content__container)}>
                  <Text className={clsx(styles.content__name)} weight={500}>
                     {card.title}
                  </Text>
                  <Text
                     className={clsx(styles.content__address)}
                     size='14'
                     color='gray'
                  >
                     {card.metroStation}
                  </Text>
                  <RatingSelector />
               </div>
               <textarea
                  placeholder='Расскажите о впечатлениях'
                  className={clsx(styles.content__input)}
                  onChange={(event) =>
                     dispatch(setReview(event.currentTarget.value))
                  }
                  autoFocus
                  name='review'
                  id='review'
               />
               <Button onClick={onSave} variant={ButtonVariant.ACCENT}>
                  Сохранить
               </Button>
            </div>
         </Modal>

         <LoftImages />
         <LoftDescription />
         <LoftComments />
      </>
   );
};
