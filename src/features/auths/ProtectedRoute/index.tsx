import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../store';
import { useBackNavigation } from '../../../hooks/useBackNavigation';

type ProtectedRouteProps = {
   children: React.ReactElement;
   isAuthRequired?: boolean;
};

export const ProtectedRoute = ({
   isAuthRequired,
   children,
}: ProtectedRouteProps) => {
   const location = useLocation();
   const { goToLastPage } = useBackNavigation();
   const { isAuth } = useSelector((state) => state.user);
   if (isAuth != isAuthRequired) {
      if (isAuth) {
         goToLastPage();
      }
      return <Navigate replace to='/login' state={{ from: location }} />;
   }
   return children;
};
