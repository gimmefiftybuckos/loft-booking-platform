import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardCatalogSlice';
import modalControlReducer from './modalControlSlice';

const store = configureStore({
   reducer: {
      cards: cardReducer,
      modalControl: modalControlReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
