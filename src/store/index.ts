import { configureStore } from '@reduxjs/toolkit';

import {
   TypedUseSelectorHook,
   useDispatch as dispatchHook,
   useSelector as selectorHook,
} from 'react-redux';

import cardReducer from './slices/cardCatalog';
import modalControlReducer from './slices/modalControl';
import userAuthReducer from './slices/userAuth';
import favoritesReducer from './slices/favorites';
import commentsReducer from './slices/comments';

const store = configureStore({
   reducer: {
      cards: cardReducer,
      comments: commentsReducer,
      modalControl: modalControlReducer,
      user: userAuthReducer,
      favorites: favoritesReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
