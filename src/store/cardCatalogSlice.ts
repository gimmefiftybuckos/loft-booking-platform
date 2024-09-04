import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TypeParamsType, ILoftCard } from '../types';
import { getLoftsData } from '../api';
import { MAX_PRICE } from '../constants';

export type CardSliceType = {
   cards: ILoftCard[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   type: TypeParamsType;
   date: string;
   price: string;
   limit: number;
   page: number;
   hasMore: boolean;
};

const initialState: CardSliceType = {
   cards: [],
   status: 'idle',
   type: '',
   date: '',
   price: '',
   limit: 10,
   page: 1,
   hasMore: true,
};

const cardSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      setType(state, action: PayloadAction<TypeParamsType>) {
         state.type = action.payload;
      },
      setDate(state, action: PayloadAction<string>) {
         state.date = action.payload;
      },
      setPrice(state, action: PayloadAction<string>) {
         if (action.payload !== `0:${MAX_PRICE}`) {
            state.price = action.payload;
         } else {
            state.price = '';
         }
      },
      resetFilters(state) {
         state.type = '';
         state.date = '';
         state.price = '';
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

export const { setType, setDate, setPrice, resetFilters, resetCardsState } =
   cardSlice.actions;

export default cardSlice.reducer;
