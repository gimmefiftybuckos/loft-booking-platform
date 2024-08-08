import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Main.module.sass';

import { Home } from '../Home';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
         </Routes>
      </main>
   );
};
