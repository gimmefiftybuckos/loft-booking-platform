import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
   authUserApi,
   loginUserApi,
   logoutApi,
   registerUserApi,
   startSession,
   stopSession,
   TLoginData,
   TRegisterData,
} from '../../services/api';
import { TUser } from '../../types';

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

export const authUser = createAsyncThunk('user/auth', authUserApi);
export const logoutUser = createAsyncThunk('user/logout', async () =>
   logoutApi().then(() => stopSession())
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

const userAuth = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            console.log('Debug: User registred');

            state.isAuth = true;
            state.userData = action.payload.user;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            console.log('Debug: User logined');

            state.isAuth = true;
            state.userData = action.payload.user;
         })
         .addCase(authUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.userData = { email: '', login: '' };
         })
         .addCase(authUser.fulfilled, (state, action) => {
            console.log('Debug: User authed');

            state.userData = action.payload.user;
            state.isAuth = true;
         })
         .addCase(logoutUser.fulfilled, (state) => {
            console.log('Debug: User logout');

            state.isAuth = false;
            state.userData = {
               email: '',
               login: '',
            };
         });
   },
});

export const {} = userAuth.actions;

export default userAuth.reducer;
