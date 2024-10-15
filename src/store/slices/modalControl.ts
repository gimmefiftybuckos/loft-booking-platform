import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TInitalState = {
   controlIndex: number;
   imageIndex: number;
};

const initialState: TInitalState = {
   controlIndex: -1,
   imageIndex: -1,
};

const modalControl = createSlice({
   name: 'modalControl',
   initialState,
   reducers: {
      setIndexModal(state, action: PayloadAction<number>) {
         state.controlIndex =
            state.controlIndex === action.payload ? -1 : action.payload;
      },
      setModalClose(state) {
         state.controlIndex = -1;
      },
      setImageIndex(state, action) {
         state.imageIndex = action.payload;
      },
   },
});

export const { setIndexModal, setModalClose, setImageIndex } =
   modalControl.actions;

export default modalControl.reducer;
