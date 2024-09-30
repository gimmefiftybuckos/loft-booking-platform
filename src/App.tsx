import { Main } from './parts/Main';
import { Layout } from './parts/Layout';
import { useDispatch, useSelector } from './store';
import { authUser } from './store/slices/userAuth';
import { useEffect, useState } from 'react';
import { getFavorites } from './store/slices/favorites';

function App() {
   const dispatch = useDispatch();
   const { isAuth, status } = useSelector((state) => state.user);
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      if (isAuth) {
         dispatch(getFavorites());
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
