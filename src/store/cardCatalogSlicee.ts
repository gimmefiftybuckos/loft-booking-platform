import { createSlice } from '@reduxjs/toolkit';
import { getLoftsData } from '../api';
import { ILoftCard } from '../types';

export type CardSliceType = {
   cards: ILoftCard[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: CardSliceType = {
   cards: [],
   status: 'idle',
};

const cardSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getLoftsData.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getLoftsData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cards = action.payload;
         })
         .addCase(getLoftsData.rejected, (state) => {
            state.status = 'failed';
         });
   },
});

// export const { getCardData } = cardSlice.actions;

export default cardSlice.reducer;
