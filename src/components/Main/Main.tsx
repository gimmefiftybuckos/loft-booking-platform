import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Main.module.sass';

import { Home } from '../Home';
import { CatalogSection } from '../_sections/CatalogSection';

export const Main = () => {
   return (
      <main className={clsx(styles.main)}>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<CatalogSection />} />
            {/* <Route path="*" element={<NotFound />} /> */}
         </Routes>
      </main>
   );
};
