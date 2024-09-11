import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { Home } from '../Home';
import { Catalog } from '../Catalog';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' />
            {/* <Route path="*" element={<NotFound />} /> */}
         </Routes>
      </main>
   );
};
