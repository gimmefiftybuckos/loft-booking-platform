import clsx from 'clsx';

import styles from './BannerSection.module.sass';

import { bannersContent } from '../../../utils';

import { Text } from '../../_reusable/Text';

export const BannerSection = () => {
   return (
      <section className={clsx(styles.section)}>
         <ul className={clsx(styles['banner-list'])}>
            {bannersContent.map((item, index) => {
               return (
                  <li key={index} className={clsx(styles.banner)}>
                     <img
                        src={`/assets/${item.iconPath}.svg`}
                        alt={`${item.iconPath} icon`}
                     />
                     <Text size='14'>
                        <Text size='14' as={'span'} weight={800}>
                           {item.text.accent}
                        </Text>
                        {item.text.main}
                     </Text>
                  </li>
               );
            })}
         </ul>
      </section>
   );
};
