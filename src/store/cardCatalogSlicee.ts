import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLoftsData } from '../api';
import { ILoftCard } from '../types';

export type CardSliceType = {
   cards: ILoftCard[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   filter: string;
   limit: number;
   page: number;
   hasMore: boolean;
};

const initialState: CardSliceType = {
   cards: [],
   status: 'idle',
   filter: '',
   limit: 10,
   page: 1,
   hasMore: true,
};

const cardSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      setFilter(state, action: PayloadAction<string>) {
         state.filter = action.payload;
      },
      resetCardsState(state) {
         state.cards = [];
         state.page = 1;
         state.hasMore = true;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getLoftsData.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getLoftsData.fulfilled, (state, action) => {
            state.status = 'succeeded';

            state.cards = [...state.cards, ...action.payload];

            state.hasMore = action.payload.length >= state.limit;
            state.page += 1;
         })
         .addCase(getLoftsData.rejected, (state) => {
            state.status = 'failed';
         });
   },
});

export const { setFilter, resetCardsState } = cardSlice.actions;

export default cardSlice.reducer;
