import { useEffect } from 'react';
import { CardsList } from '../../components/CardsList';
import { useDispatch, useSelector } from '../../store';
import { getFavoritesLofts } from '../../store/slices/favorites';
import { useNavigate } from 'react-router-dom';

export const FavoritesLofts = () => {
   const dispatch = useDispatch();
   const { favoritesLofts, status } = useSelector((state) => state.favorites);
   const { isAuth } = useSelector((state) => state.user);
   const navigate = useNavigate();
   // const { saveCurrentPage } = useBackNavigation();

   const fetchMore = () => {
      if (status !== 'loading') {
         dispatch(getFavoritesLofts()).catch((error) => console.error(error));
      }
   };

   useEffect(() => {
      if (!isAuth) {
         // saveCurrentPage();
         navigate('/login');
      }

      if (isAuth) {
         dispatch(getFavoritesLofts());
      }
   }, []);

   return (
      <section>
         <CardsList
            title={'Избранное'}
            fetchMore={fetchMore}
            hasMore={false}
            loftsState={favoritesLofts}
            status={status}
         />
      </section>
   );
};
