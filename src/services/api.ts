import axios, { AxiosResponse } from 'axios';
import { ILoftCard, TCatalogParams, TUser } from '../types';
import { API_URL } from './constants';
import { deleteCookie, setCookie } from './utils';

const api = axios.create({
   baseURL: API_URL,
   timeout: 5000,
});

const checkResponse = <T>(res: AxiosResponse): Promise<T> => {
   return res.status >= 200 && res.status < 300
      ? Promise.resolve(res.data)
      : Promise.reject(res.data);
};

export const getCardsApi = async ({
   type,
   page,
   date,
   price,
}: TCatalogParams): Promise<ILoftCard[]> => {
   const query = { params: { type, page, date, price } };

   try {
      const response = await api.get<ILoftCard[]>('/catalog', query);

      return checkResponse<ILoftCard[]>(response);
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Axios error:', error.response?.data || error.message);
         throw new Error(error.response?.data?.message || 'Ошибка запроса');
      } else {
         console.error('Unexpected error:', error);
         throw new Error('Неизвестная ошибка');
      }
   }
};

export const getLoftApi = async (id: string) => {
   try {
      const response = await api.get<ILoftCard>(`/catalog/${id}`);

      return checkResponse<ILoftCard>(response);
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Axios error:', error.response?.data || error.message);
         throw new Error(error.response?.data?.message || 'Ошибка запроса');
      } else {
         console.error('Unexpected error:', error);
         throw new Error('Неизвестная ошибка');
      }
   }
};

type TServerResponse<T> = {
   success: boolean;
} & T;

export type TAuthResponse = TServerResponse<{
   refreshToken: string;
   accessToken: string;
   user: TUser;
}>;

export type TRegisterData = {
   email: string;
   login: string;
   password: string;
};

export const registerUserApi = async (data: TRegisterData) => {
   try {
      const response = await api.post(`/auth/registration`, data, {
         headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      return checkResponse<TAuthResponse>(response);
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Axios error:', error.response?.data || error.message);
         throw new Error(error.response?.data?.message || 'Ошибка запроса');
      } else {
         console.error('Unexpected error:', error);
         throw new Error('Неизвестная ошибка');
      }
   }
};

export type TLoginData = {
   login: string;
   password: string;
};

export const loginUserApi = async (data: TLoginData) => {
   try {
      const response = await api.post(`/auth/login`, data, {
         headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      return checkResponse<TAuthResponse>(response);
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Axios error:', error.response?.data || error.message);
         throw new Error(error.response?.data?.message || 'Ошибка запроса');
      } else {
         console.error('Unexpected error:', error);
         throw new Error('Неизвестная ошибка');
      }
   }
};

export const startSession = (auth: TAuthResponse) => {
   console.log(auth);

   setCookie('accessToken', auth.accessToken);
   localStorage.setItem('refreshToken', auth.refreshToken);
};

export const stopSession = () => {
   deleteCookie('accessToken');
   localStorage.removeItem('refreshToken');
};
