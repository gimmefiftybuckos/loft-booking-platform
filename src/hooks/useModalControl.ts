import { useDispatch, useSelector } from '../store';
import { setIndexModal, setModalClose } from '../store/slices/modalControl';
import { useBodyScrollLock } from './useBodyScrollLock';

export const useModalControl = () => {
   const dispatch = useDispatch();
   const controlIndex = useSelector((state) => state.modalControl.controlIndex);

   const toggleModal = (key: number) => {
      dispatch(setIndexModal(key));
   };

   const closeModal = () => {
      dispatch(setModalClose());
   };

   useBodyScrollLock(controlIndex !== -1);

   return {
      controlIndex,
      toggleModal,
      closeModal,
   };
};
