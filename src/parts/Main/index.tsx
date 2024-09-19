import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { Home } from '../../pages/Home';
import { Catalog } from '../../pages/Catalog';
import { Loft } from '../../pages/Loft';
import { Registration } from '../../pages/Registration';
import { Login } from '../../pages/Login';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' element={<Loft />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            {/* <Route path="*" element={<NotFound />} /> */}
         </Routes>
      </main>
   );
};
