import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../store';

type ProtectedRouteProps = {
   children: React.ReactElement;
   isAuthRequired?: boolean;
};

export const ProtectedRoute = ({
   isAuthRequired,
   children,
}: ProtectedRouteProps) => {
   const location = useLocation();
   const { isAuth } = useSelector((state) => state.user);
   if (isAuth != isAuthRequired) {
      if (isAuth) {
         const previousPage = { pathname: '/' };
         return <Navigate replace to={previousPage} />;
      }
      return <Navigate replace to='/login' state={{ from: location }} />;
   }
   return children;
};
