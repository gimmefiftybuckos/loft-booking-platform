import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import styles from './index.module.sass';

import { Home } from '../Home';
import { CatalogSection } from '../../components/SectionCatalog';

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
