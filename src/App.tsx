import { Main } from './parts/Main';
import { Layout } from './parts/Layout';
import { useDispatch, useSelector } from './store';
import { authUser } from './store/slices/userAuth';
import { useEffect } from 'react';
import { getFavorites } from './store/slices/favorites';

function App() {
   const dispatch = useDispatch();
   const { isAuth } = useSelector((state) => state.user);

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

   return (
      <>
         <Layout>
            <Main />
         </Layout>
      </>
   );
}

export default App;
