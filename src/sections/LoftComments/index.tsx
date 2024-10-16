import clsx from 'clsx';
import { useSelector } from '../../store';

import styles from './index.module.sass';

import { Text } from '../../components/ui/Text';
import { Button, ButtonVariant } from '../../components/Button';
import { CommentList } from '../../components/CommentsList';
import { Stars } from '../../components/Stars';
import { useModalControl } from '../../hooks/useModalControl';
import { ModalTypes } from '../../features/modal/Modal';

export const LoftComments = () => {
   const { card } = useSelector((state) => state.cards);
   const { toggleModal } = useModalControl();

   const averageRating = card?.averageRating
      ? parseFloat(card.averageRating)
      : 0;

   return (
      <section className={clsx(styles.container)}>
         <Text as='h2' size='24' weight={500}>
            Отзывы
         </Text>
         <div className={clsx(styles.rating)}>
            <div className={clsx(styles.rating__container)}>
               <Text as='p' size='32' weight={600}>
                  {averageRating.toFixed(1)}
               </Text>
               <Stars size averageRating={card?.averageRating} />
               <Text color='gray' weight={400}>
                  {card?.reviewsCount} отзывов
               </Text>
            </div>
            <Button
               variant={ButtonVariant.ACCENT}
               onClick={() => toggleModal(ModalTypes.REVIEW)}
            >
               Оставить отзыв
            </Button>
         </div>
         <CommentList />
         <Button
            className={clsx(styles.button)}
            variant={ButtonVariant.OUTLINED}
         >
            Показать все отзывы
         </Button>
      </section>
   );
};
