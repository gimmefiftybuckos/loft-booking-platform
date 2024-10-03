import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   getFavoritesIdApi,
   getFavoritesLoftsApi,
   setFavoriteApi,
   TFavoritesData,
} from '../../services/api';
import { logoutUser } from './userAuth';
import { ILoft } from '../../types';

export const setFavorite = createAsyncThunk(
   'favorites/setFavorite',
   async (loftId: string) => setFavoriteApi(loftId)
);

export const getFavoritesId = createAsyncThunk(
   'favorites/getFavoritesId',
   getFavoritesIdApi
);
export const getFavoritesLofts = createAsyncThunk(
   'favorites/getFavoritesLofts',
   getFavoritesLoftsApi
);

type TFavoritesSlice = {
   favoritesId: TFavoritesData[];
   favoritesLofts: ILoft[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: TFavoritesSlice = {
   favoritesId: [],
   favoritesLofts: [],
   status: 'idle',
};

const favorites = createSlice({
   name: 'favorites',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(setFavorite.fulfilled, (state, action) => {
            state.favoritesId = action.payload;
            console.log(state.favoritesId);
         })
         .addCase(getFavoritesId.fulfilled, (state, action) => {
            state.favoritesId = action.payload;
            console.log(state.favoritesId);
         })
         .addCase(getFavoritesLofts.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getFavoritesLofts.fulfilled, (state, action) => {
            state.favoritesLofts = action.payload;

            console.log(state.favoritesLofts);
         })
         .addCase(getFavoritesLofts.rejected, (state) => {
            state.status = 'failed';
            state.favoritesLofts = [];
         })
         .addCase(logoutUser.fulfilled, (state) => {
            state.favoritesId = [];
            state.favoritesLofts = [];
            console.log(state.favoritesId);
         });
   },
});

export const {} = favorites.actions;

export default favorites.reducer;
