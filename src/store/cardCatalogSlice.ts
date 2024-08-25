import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterParamsType, ILoftCard } from '../types';
import { getLoftsData } from '../api';

export type CardSliceType = {
   cards: ILoftCard[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   filter: FilterParamsType;
   toSearchFilter: FilterParamsType;
   date: string;
   limit: number;
   page: number;
   hasMore: boolean;
};

const initialState: CardSliceType = {
   cards: [],
   status: 'idle',
   filter: '',
   toSearchFilter: '',
   date: '',
   limit: 10,
   page: 1,
   hasMore: true,
};

const cardSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      setFilter(state, action: PayloadAction<FilterParamsType>) {
         state.filter = action.payload;
      },
      setToSearchFilter(state, action: PayloadAction<FilterParamsType>) {
         state.toSearchFilter = action.payload;
      },
      setDate(state, action: PayloadAction<string>) {
         state.date = action.payload;
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

export const { setFilter, setToSearchFilter, setDate, resetCardsState } =
   cardSlice.actions;

export default cardSlice.reducer;
