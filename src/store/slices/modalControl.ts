import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalControl = createSlice({
   name: 'modalControl',
   initialState: {
      controlIndex: -1,
   },
   reducers: {
      setIndexModal(state, action: PayloadAction<number>) {
         state.controlIndex =
            state.controlIndex === action.payload ? -1 : action.payload;
      },
      setModalClose(state) {
         state.controlIndex = -1;
      },
   },
});

export const { setIndexModal, setModalClose } = modalControl.actions;

export default modalControl.reducer;
