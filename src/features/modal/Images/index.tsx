import clsx from 'clsx';
import { useSelector } from '../../../store';

import styles from './index.module.sass';

import { API_URL } from '../../../services/constants';
import { useModalControl } from '../../../hooks/useModalControl';
import { Preloader } from '../../../components/ui/Preloader';

export const Images = () => {
   const { card } = useSelector((state) => state.cards);
   const { curImageIndex, setCurImageIndex } = useModalControl();

   const images = card?.imageUrl;

   if (!images) {
      return <Preloader />;
   }

   enum ImagesCount {
      MAX = images.length - 1,
      MIN = 0,
   }

   const clickNext = () => {
      if (ImagesCount.MAX !== curImageIndex) {
         setCurImageIndex(curImageIndex + 1);
      }
   };

   const clickPrev = () => {
      if (ImagesCount.MIN !== curImageIndex) {
         setCurImageIndex(curImageIndex - 1);
      }
   };

   //    useEffect(() => {
   //       const handleKeyDown = (event: KeyboardEvent) => {
   //          if (event.key === 'ArrowRight') {
   //             clickNext();
   //          } else if (event.key === 'ArrowLeft') {
   //             clickPrev();
   //          }
   //       };
   //       document.addEventListener('keydown', handleKeyDown);
   //       return () => {
   //          document.removeEventListener('keydown', handleKeyDown);
   //       };
   //    }, []);

   return (
      <>
         <button
            onClick={clickPrev}
            className={clsx(styles.button, styles.button_left)}
         ></button>
         <img
            className={clsx(styles.image)}
            src={`${API_URL}/catalog/uploads/${images[curImageIndex]}`}
            alt=''
         />
         <button
            onClick={clickNext}
            className={clsx(styles.button, styles.button_right)}
         ></button>
      </>
   );
};
