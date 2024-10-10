import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TypeParamsType, ILoft, TCatalogParams } from '../../types';
import { MAX_PRICE } from '../../services/constants';
import { getAllLoftsApi, getLoftApi } from '../../services/api';

export const getCardsList = createAsyncThunk(
   'cards/getCards',
   async ({ type, page, date, price }: TCatalogParams) =>
      getAllLoftsApi({ type, page, date, price })
);

export const getLoft = createAsyncThunk('cards/getCard', async (id: string) =>
   getLoftApi(id)
);

type TCardSlice = {
   cards: ILoft[];
   card: ILoft | null;
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   type: TypeParamsType;
   date: string;
   price: string;
   limit: number;
   page: number;
   hasMore: boolean;
};

const initialState: TCardSlice = {
   cards: [],
   card: null,
   status: 'idle',
   type: '',
   date: '',
   price: '',
   limit: 10,
   page: 1,
   hasMore: true,
};

const cardCatalog = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      setType(state, action) {
         state.type = action.payload;
      },
      setDate(state, action) {
         state.date = action.payload;
      },
      setPrice(state, action) {
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
      resetLoft(state) {
         state.card = null;
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
            state.page++;
         })
         .addCase(getCardsList.rejected, (state) => {
            state.status = 'failed';
         })
         .addCase(getLoft.fulfilled, (state, action) => {
            state.card = action.payload;
         });
   },
});

export const {
   setType,
   setDate,
   setPrice,
   resetFilters,
   resetCardsState,
   resetLoft,
} = cardCatalog.actions;

export default cardCatalog.reducer;
