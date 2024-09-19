import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
   loginUserApi,
   registerUserApi,
   startSession,
   TLoginData,
   TRegisterData,
} from '../services/api';
import { TUser } from '../types';

export const registerUser = createAsyncThunk(
   'user/register',
   async (data: TRegisterData) =>
      registerUserApi(data).then((res) => {
         startSession(res);
         return res;
      })
);

export const loginUser = createAsyncThunk(
   'user/login',
   async (data: TLoginData) =>
      loginUserApi(data).then((res) => {
         startSession(res);
         return res;
      })
);

export type TUserAuth = {
   userData: TUser;
   isAuth: boolean;
   error: string | null | undefined;
};

const initialState: TUserAuth = {
   userData: {
      email: '',
      login: '',
   },
   isAuth: false,
   error: null,
};

const userAuthSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message;
            console.log(action.payload, 'проеб');
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isAuth = true;
            state.userData = action.payload.user;
            console.log(state.userData);
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuth = true;
            state.userData = action.payload.user;
         });
   },
});

export const {} = userAuthSlice.actions;

export default userAuthSlice.reducer;
