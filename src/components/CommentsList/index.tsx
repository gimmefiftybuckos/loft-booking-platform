import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../ui/Text';
import { useSelector } from '../../store';

export const CommentList = () => {
   const { comments } = useSelector((state) => state.comments);

   return (
      <li className={clsx(styles.list)}>
         {comments?.map((item) => {
            return (
               <ul key={item.userId} className={clsx(styles.item)}>
                  <div className={clsx(styles.item__about)}>
                     <div className={clsx(styles.item__container)}>
                        <Text
                           className={clsx(styles.item__name)}
                           as='p'
                           weight={600}
                        >
                           {item.login}
                        </Text>
                        <div aria-hidden className={clsx(styles.star)}></div>
                        <Text as='p' size='14' weight={600}>
                           {item.userRating}
                        </Text>
                     </div>
                     <Text as='p' color='gray' size='14' weight={400}>
                        temp
                     </Text>
                  </div>
                  <Text as='p'>{item.userReview}</Text>
               </ul>
            );
         })}
         {/* <ul className={clsx(styles.item)}>
            <div className={clsx(styles.item__about)}>
               <div className={clsx(styles.item__container)}>
                  <Text className={clsx(styles.item__name)} as='p' weight={600}>
                     Placeholder name bebra
                  </Text>
                  <div aria-hidden className={clsx(styles.star)}></div>
                  <Text as='p' size='14' weight={600}>
                     {card?.averageRating}
                  </Text>
               </div>
               <Text as='p' color='gray' size='14' weight={400}>
                  22 мар 2021
               </Text>
            </div>
            <Text as='p'>
               Спасибо большое организаторам за то, что предоставили площадку
               для празднования дня рождения. Прекрасный и просторный лофт, есть
               веранда с видом на Останкинскую телебашню. Осталась довольна
               местом, все понравилось. Котя – просто любовь, выбор был
               очевиден😍 P.S. Холодильник надо бы починить, почти не морозит
            </Text>
         </ul>
         <ul className={clsx(styles.item)}>
            <div className={clsx(styles.item__about)}>
               <div className={clsx(styles.item__container)}>
                  <Text className={clsx(styles.item__name)} as='p' weight={600}>
                     Placeholder name bebra
                  </Text>
                  <div aria-hidden className={clsx(styles.star)}></div>
                  <Text as='p' size='14' weight={600}>
                     {card?.averageRating}
                  </Text>
               </div>
               <Text as='p' color='gray' size='14' weight={400}>
                  22 мар 2021
               </Text>
            </div>
            <Text as='p'>
               Спасибо большое организаторам за то, что предоставили площадку
               для празднования дня рождения. Прекрасный и просторный лофт, есть
               веранда с видом на Останкинскую телебашню. Осталась довольна
               местом, все понравилось. Котя – просто любовь, выбор был
               очевиден😍 P.S. Холодильник надо бы починить, почти не морозит
            </Text>
         </ul> */}
      </li>
   );
};
