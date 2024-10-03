import clsx from 'clsx';

import styles from './index.module.sass';

import { Text } from '../ui/Text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Preloader } from '../ui/Preloader';
import { ILoft } from '../../types';
import { Card } from '../Card';

type TCardsList = {
   title: string;
   fetchMore: () => void;
   hasMore?: boolean;
   loftsState: ILoft[];
   status: string;
};

export const CardsList: React.FC<TCardsList> = ({
   title,
   fetchMore,
   hasMore,
   loftsState,
   status,
}) => {
   return (
      <div className={clsx(styles.content)}>
         <Text as={'h1'} weight={700} size='32'>
            {title}
         </Text>
         <InfiniteScroll
            className={clsx(styles.container)}
            next={fetchMore}
            hasMore={hasMore || false}
            loader={
               status !== 'failed' ? (
                  <>
                     <Preloader />
                     <Preloader />
                  </>
               ) : (
                  <Text>Server Error</Text>
               )
            }
            dataLength={loftsState.length}
         >
            {loftsState.map((item) => (
               <Card key={item.id} wide cardData={item} />
            ))}
         </InfiniteScroll>
      </div>
   );
};
