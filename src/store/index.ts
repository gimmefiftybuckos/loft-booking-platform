import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardCatalogSlice';

const store = configureStore({
   reducer: {
      cards: cardReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
