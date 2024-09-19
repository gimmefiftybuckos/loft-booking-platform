import { configureStore } from '@reduxjs/toolkit';

import {
   TypedUseSelectorHook,
   useDispatch as dispatchHook,
   useSelector as selectorHook,
} from 'react-redux';

import cardReducer from './cardCatalogSlice';
import modalControlReducer from './modalControlSlice';
import userAuthReducer from './userAuthSlice';

const store = configureStore({
   reducer: {
      cards: cardReducer,
      modalControl: modalControlReducer,
      user: userAuthReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
