import clsx from 'clsx';
import { Text } from '../_reusable/Text';

import styles from './CardBlockSection.module.sass';
import { ICardSection } from '../../types';

type CardBlockSectionProps = {
   data: ICardSection[];
};

export const CardBlockSection: React.FC<CardBlockSectionProps> = ({ data }) => {
   return (
      <section>
         <Text as={'h2'} weight={700} size='24'>
            Любой тип площадки
         </Text>
         <div className={clsx(styles.container)}>
            {data.map((item, index) => {
               const { title, param } = item;

               return (
                  <div key={index} className={clsx(styles.card)}>
                     <img
                        className={clsx(styles.card__image)}
                        src={`/assets/block-section/${param || 'all'}.png`}
                        alt=''
                     />
                     <p className={clsx(styles.card__text)}>{title}</p>
                  </div>
               );
            })}
         </div>
      </section>
   );
};
