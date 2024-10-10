import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { Home } from '../../pages/Home';
import { Catalog } from '../../pages/Catalog';
import { Loft } from '../../pages/Loft';
import { Registration } from '../../pages/Registration';
import { Login } from '../../pages/Login';
import { ProtectedRoute } from '../../features/auths/ProtectedRoute';
import { Favorites } from '../../pages/Favorites';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' element={<Loft />} />
            <Route
               path='/login'
               element={
                  <ProtectedRoute isAuthRequired={false}>
                     <Login />
                  </ProtectedRoute>
               }
            />
            <Route
               path='/registration'
               element={
                  <ProtectedRoute isAuthRequired={false}>
                     <Registration />
                  </ProtectedRoute>
               }
            />
            <Route path='/favorites' element={<Favorites />} />
            {/* <Route path="*" element={<NotFound />} /> */}
         </Routes>
      </main>
   );
};
