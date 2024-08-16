import clsx from 'clsx';
import { Text } from '../_reusable/Text';

import styles from './CardBlockSection.module.sass';

export const CardBlockSection = () => {
   return (
      <section>
         <Text as={'h2'} weight={700} size='24'>
            Любой тип площадки
         </Text>
         <div className={clsx(styles['card-container'])}></div>
      </section>
   );
};
