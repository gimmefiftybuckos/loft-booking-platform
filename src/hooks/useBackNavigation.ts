import { useNavigate } from 'react-router-dom';

const LAST_PAGE_KEY = 'lastVisitedPage';

export const useBackNavigation = () => {
   const navigate = useNavigate();

   const saveCurrentPage = () => {
      console.log(window.location.pathname);
      localStorage.setItem(LAST_PAGE_KEY, window.location.pathname);
   };

   const goToLastPage = () => {
      const lastVisitedPage = localStorage.getItem(LAST_PAGE_KEY);
      if (lastVisitedPage) {
         navigate(lastVisitedPage);
         localStorage.removeItem(LAST_PAGE_KEY);
      }
   };

   return { goToLastPage, saveCurrentPage };
};
