import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILoftCard, TCatalogParams, TUser } from '../types';
import { API_URL } from './constants';
import { deleteCookie, getCookie, setCookie } from './utils';

const api = axios.create({
   baseURL: API_URL,
   timeout: 5000,
});

api.interceptors.request.use(
   (config) => {
      config.headers['accept-language'] = 'ru-RU, ru;q=0.9, en';
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

const checkResponse = <T>(res: AxiosResponse): Promise<T> => {
   return res.status >= 200 && res.status < 300
      ? Promise.resolve(res.data)
      : Promise.reject(res.data);
};

const catchError = (error: unknown) => {
   if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Ошибка запроса');
   } else {
      console.error('Unexpected error:', error);
      throw new Error('Неизвестная ошибка');
   }
};

const refreshTokens = async () => {
   try {
      const response = await api.post<TAuthResponse>(
         '/user/refresh',
         { token: localStorage.getItem('refreshToken') },
         {
            headers: {
               'Content-Type': 'application/json;charset=utf-8',
            },
         }
      );

      return checkResponse<TAuthResponse>(response);
   } catch (error) {
      catchError(error);
      throw error;
   }
};

interface ApiError {
   error: string;
   statusCode?: number;
   message?: string;
}

export const fetchAuth = async <T>(options: AxiosRequestConfig): Promise<T> => {
   try {
      const response = await api.request<T>(options);
      return checkResponse<T>(response);
   } catch (error) {
      const axiosError = error as AxiosError<ApiError>;

      if (
         axiosError.response?.data.error.includes('Invalid or expired token')
      ) {
         const refreshData = await refreshTokens();
         startSession(refreshData);

         const updatedOptions = {
            ...options,
            headers: {
               Authorization: `Bearer ${refreshData.accessToken}`,
            },
         } as AxiosRequestConfig;

         const response = await api.request<T>(updatedOptions);
         return checkResponse<T>(response);
      } else {
         catchError(axiosError);
         throw axiosError;
      }
   }
};

export const getCardsApiTest = async ({
   type,
   page,
   date,
   price,
}: TCatalogParams): Promise<ILoftCard[]> => {
   try {
      const response = await fetchAuth<ILoftCard[]>({
         url: '/catalog',
         method: 'GET',
         headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
         },
         params: { type, page, date, price },
      });

      return response;
   } catch (error) {
      catchError(error);
      throw error;
   }
};

export const getCardsApi = async ({
   type,
   page,
   date,
   price,
}: TCatalogParams): Promise<ILoftCard[]> => {
   try {
      const response = await api.get<ILoftCard[]>('/catalog', {
         headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
         },
         params: { type, page, date, price },
      });
      return checkResponse<ILoftCard[]>(response);
   } catch (error) {
      catchError(error);
      throw error;
   }
};

export const getLoftApi = async (id: string) => {
   try {
      const response = await api.get<ILoftCard>(`/catalog/${id}`);

      return checkResponse<ILoftCard>(response);
   } catch (error) {
      catchError(error);
      throw error;
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
      catchError(error);
      throw error;
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
      catchError(error);
      throw error;
   }
};

export const startSession = (auth: TAuthResponse) => {
   setCookie('accessToken', auth.accessToken);
   localStorage.setItem('refreshToken', auth.refreshToken);
   console.log(document.cookie);
};

export const stopSession = () => {
   deleteCookie('accessToken');
   localStorage.removeItem('refreshToken');
};
