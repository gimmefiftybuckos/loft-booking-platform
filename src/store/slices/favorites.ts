import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   getFavoritesApi,
   setFavoriteApi,
   TFavoritesData,
} from '../../services/api';
import { logoutUser } from './userAuth';

export const setFavorite = createAsyncThunk(
   'favorites/setFavorite',
   async (loftId: string) => setFavoriteApi(loftId)
);

export const getFavorites = createAsyncThunk(
   'favorites/getFavorites',
   getFavoritesApi
);

type TFavoritesSlice = {
   favorites: TFavoritesData[];
};

const initialState: TFavoritesSlice = {
   favorites: [],
};

const favorites = createSlice({
   name: 'favorites',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(setFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload;
            console.log(state.favorites);
         })
         .addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
            console.log(state.favorites);
         })
         .addCase(logoutUser.fulfilled, (state) => {
            state.favorites = [];
            console.log(state.favorites);
         });
   },
});

export const {} = favorites.actions;

export default favorites.reducer;
