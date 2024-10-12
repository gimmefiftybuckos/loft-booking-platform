import { useCallback } from 'react';
import { useDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { TypeParamsType, ICardSection } from '../../types';
import { setType } from '../../store/slices/cardCatalog';

import { Text } from '../../components/ui/Text';

type CardBlockSectionProps = {
   data: ICardSection[];
};

export const HomeCardBlock: React.FC<CardBlockSectionProps> = ({ data }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const clickHandle = useCallback((type: TypeParamsType) => {
      navigate('/catalog');
      dispatch(setType(type));
   }, []);

   return (
      <section>
         <Text className={clsx(styles.title)} as={'h2'} weight={700} size='24'>
            Любой тип площадки
         </Text>
         <div className={clsx(styles.container)}>
            {data.map((item, index) => {
               const { title, type } = item;

               return (
                  <div
                     onClick={() => clickHandle(type)}
                     key={index}
                     className={clsx(styles.card)}
                  >
                     <img
                        className={clsx(styles.card__image)}
                        src={`/assets/block-section/${type || 'all'}.png`}
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
