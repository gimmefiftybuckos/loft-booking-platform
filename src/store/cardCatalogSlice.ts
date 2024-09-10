import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TypeParamsType, ILoftCard, TCatalogParams } from '../types';
import { MAX_PRICE } from '../services/constants';
import { asyncGetCardsApi } from '../services/api';

export const getCardsList = createAsyncThunk(
   'cards/getCards',
   async ({ type, page, date, price }: TCatalogParams) =>
      asyncGetCardsApi({ type, page, date, price })
);

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
         .addCase(getCardsList.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getCardsList.fulfilled, (state, action) => {
            state.status = 'succeeded';

            state.cards = [...state.cards, ...action.payload];

            state.hasMore = action.payload.length >= state.limit;
            state.page += 1;
         })
         .addCase(getCardsList.rejected, (state) => {
            state.status = 'failed';
         });
   },
});

export const { setType, setDate, setPrice, resetFilters, resetCardsState } =
   cardSlice.actions;

export default cardSlice.reducer;
