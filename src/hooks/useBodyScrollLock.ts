import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
   useEffect(() => {
      document.body.style.overflow = isLocked ? 'hidden' : 'visible';
   }, [isLocked]);
};
