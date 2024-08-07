import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home';
import clsx from 'clsx';
import styles from './Main.module.sass';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
         </Routes>
      </main>
   );
};
