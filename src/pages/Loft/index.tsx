import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLoftApi } from '../../services/api';
import { ILoftCard } from '../../types';
import clsx from 'clsx';
import { API_URL } from '../../services/constants';

import styles from './index.module.sass';

export const Loft = () => {
   const { pathname } = useLocation();
   const [loftState, setLoftState] = useState<ILoftCard>();
   const id = pathname.split('/')[2];

   const fetchData = async () => {
      const data = await getLoftApi(id);
      setLoftState(data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const coverImages = loftState?.imageUrl.slice(0, 5);

   return (
      <section>
         <div>
            <div className={clsx(styles.container)}>
               {coverImages?.map((item) => {
                  return (
                     <img
                        className={clsx(styles.image)}
                        src={`${API_URL}/uploads/${item}`}
                        loading='lazy'
                        alt=''
                     />
                  );
               })}
            </div>
         </div>
      </section>
   );
};
