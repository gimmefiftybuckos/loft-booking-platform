import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from './store';
import { getFavoritesId } from './store/slices/favorites';
import { authUser } from './store/slices/userAuth';

import { Main } from './parts/Main';
import { Layout } from './parts/Layout';

function App() {
   const dispatch = useDispatch();
   const { isAuth, status } = useSelector((state) => state.user);
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      if (isAuth) {
         dispatch(getFavoritesId());
      }
   }, [isAuth]);

   useEffect(() => {
      if (!isAuth) {
         dispatch(authUser());
      }
   }, []);

   useEffect(() => {
      if (status !== 'loading') {
         const timer = setTimeout(() => {
            setIsReady(true);
         }, 100);

         return () => clearTimeout(timer);
      }
   }, []);

   return isReady ? (
      <>
         <Layout>
            <Main />
         </Layout>
      </>
   ) : null;
}

export default App;
