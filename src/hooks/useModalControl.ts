import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setIndexModal, setModalClose } from '../store/modalControlSlice';
import { useBodyScrollLock } from './useBodyScrollLock';

export const useModalControl = () => {
   const dispatch = useDispatch<AppDispatch>();
   const controlIndex = useSelector(
      (state: RootState) => state.modalControl.controlIndex
   );

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
