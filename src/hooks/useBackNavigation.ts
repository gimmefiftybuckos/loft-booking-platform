import { useNavigate } from 'react-router-dom';

const LAST_PAGE_KEY = 'lastVisitedPage';

export const useBackNavigation = () => {
   const navigate = useNavigate();

   const saveCurrentPage = () => {
      localStorage.setItem(LAST_PAGE_KEY, window.location.pathname);
   };

   const goToLastPage = () => {
      const lastVisitedPage = localStorage.getItem(LAST_PAGE_KEY);
      if (lastVisitedPage) {
         setTimeout(() => {
            navigate(lastVisitedPage);
            localStorage.removeItem(LAST_PAGE_KEY);

            return;
         }, 200);
      }

      navigate(-1);
   };

   return { goToLastPage, saveCurrentPage };
};
