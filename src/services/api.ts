import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILoftCard, TCatalogParams, TUser } from '../types';
import { API_URL } from './constants';
import { deleteCookie, getCookie, setCookie } from './utils';

// Настройка базового инстанса axios
const api = axios.create({
   baseURL: API_URL,
   timeout: 15000,
});

// Интерсептор для запросов: добавляем заголовок с языком
api.interceptors.request.use(
   (config) => {
      config.headers['accept-language'] = 'ru-RU, ru;q=0.9, en';
      return config;
   },
   (error) => Promise.reject(error)
);

// Типизация ошибок API
interface ApiError {
   error: string;
   statusCode?: number;
   message?: string;
}

// Проверка успешности ответа
const checkResponse = <T>(res: AxiosResponse<T>): Promise<T> => {
   return res.status >= 200 && res.status < 300
      ? Promise.resolve(res.data)
      : Promise.reject(res.data);
};

// Обработка ошибок Axios
export const catchError = (error: unknown) => {
   if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      console.error(
         'Axios error:',
         axiosError.response?.data || axiosError.message
      );
      throw new Error(
         axiosError.response?.data?.error || 'Unknown Axios error'
      );
   } else {
      console.error('Unexpected error:', error);
      throw error;
   }
};

// Обновление токенов
const refreshTokens = async (): Promise<TAuthResponse | null> => {
   const refreshToken = localStorage.getItem('refreshToken');

   if (!refreshToken) {
      console.warn('Refresh token not found');
      return null;
   }

   try {
      const response = await api.post<TAuthResponse>(
         '/user/refresh',
         { token: refreshToken },
         {
            headers: {
               'Content-Type': 'application/json;charset=utf-8',
            },
         }
      );

      return checkResponse<TAuthResponse>(response);
   } catch (error) {
      catchError(error);
      return null;
   }
};

// Общий метод для запросов с авторизацией
export const fetchAuth = async <T>(
   options: AxiosRequestConfig
): Promise<T | null> => {
   try {
      const response = await api.request<T>(options);
      return checkResponse<T>(response);
   } catch (error) {
      const axiosError = error as AxiosError<ApiError>;

      // Проверка на ошибку верификации токена
      if (
         axiosError.response?.data?.error.includes('Token verification failed')
      ) {
         const refreshData = await refreshTokens();

         if (!refreshData) {
            console.warn('User not authenticated');
            return null;
         }

         startSession(refreshData);

         // Повторяем запрос с обновленным токеном
         try {
            const updatedOptions: AxiosRequestConfig = {
               ...options,
               headers: {
                  ...options.headers,
                  Authorization: `Bearer ${refreshData.accessToken}`,
               },
            };

            const retryResponse = await api.request<T>(updatedOptions);
            return checkResponse<T>(retryResponse);
         } catch (retryError) {
            catchError(retryError);
            return null;
         }
      } else {
         catchError(axiosError);
         return null;
      }
   }
};

// API для получения карточек
export const getCardsApi = async ({
   type,
   page,
   date,
   price,
}: TCatalogParams): Promise<ILoftCard[]> => {
   try {
      const response = await api.get<ILoftCard[]>('/catalog', {
         params: { type, page, date, price },
      });

      return checkResponse<ILoftCard[]>(response);
   } catch (error) {
      catchError(error);
      throw error;
   }
};

// API для получения конкретного лофта
export const getLoftApi = async (id: string): Promise<ILoftCard | null> => {
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

// API для регистрации
export const registerUserApi = async (
   data: TRegisterData
): Promise<TAuthResponse> => {
   try {
      const response = await api.post<TAuthResponse>(
         '/auth/registration',
         data,
         {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
         }
      );

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

// API для логина
export const loginUserApi = async (
   data: TLoginData
): Promise<TAuthResponse> => {
   try {
      const response = await api.post<TAuthResponse>('/auth/login', data, {
         headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      return checkResponse<TAuthResponse>(response);
   } catch (error) {
      catchError(error);
      throw error;
   }
};

// API для авторизации пользователя
export const authUserApi = async (): Promise<TAuthResponse | null> => {
   try {
      const response = await fetchAuth<TAuthResponse>({
         url: '/user/auth',
         method: 'GET',
         headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
         },
      });

      return response;
   } catch (error) {
      catchError(error);
      throw error;
   }
};

// API для выхода из системы
export const logoutApi = async (): Promise<TServerResponse<{}>> => {
   try {
      const response = await api.post<TServerResponse<{}>>('/user/logout', {
         token: localStorage.getItem('refreshToken'),
      });

      return checkResponse<TServerResponse<{}>>(response);
   } catch (error) {
      catchError(error);
      throw error;
   }
};

export type TFavoritesData = string;

// API для управления избранным
export const setFavoriteApi = async (
   loftId: string
): Promise<TFavoritesData[]> => {
   try {
      const response = await fetchAuth<TFavoritesData[]>({
         url: '/user/favorite',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
         },
         data: { loftId },
      });

      return response || [];
   } catch (error) {
      catchError(error);
      throw error;
   }
};

export const getFavoritesApi = async (): Promise<TFavoritesData[]> => {
   try {
      const response = await fetchAuth<TFavoritesData[]>({
         url: '/user/favorite',
         method: 'GET',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${getCookie('accessToken')}`,
         },
      });

      return response || [];
   } catch (error) {
      catchError(error);
      throw error;
   }
};

// Функции для начала и завершения сессии
export const startSession = (auth: TAuthResponse) => {
   setCookie('accessToken', auth.accessToken);
   localStorage.setItem('refreshToken', auth.refreshToken);
   console.log('Session started:', localStorage.getItem('refreshToken'));
};

export const stopSession = () => {
   deleteCookie('accessToken');
   localStorage.removeItem('refreshToken');
   console.log('Session stopped');
};
