import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILoftCard, TCatalogParams, TUser } from '../types';
import { API_URL } from './constants';
import { deleteCookie, getCookie, setCookie } from './utils';

const api = axios.create({
   baseURL: API_URL,
   timeout: 15000,
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

export const catchError = (error: unknown) => {
   const axiosError = error as AxiosError<ApiError>;
   if (axios.isAxiosError(error)) {
      console.error(
         'Axios error:',
         axiosError.response?.data || axiosError.message
      );
      throw new Error(axiosError.response?.data.error);
   } else {
      console.error('Unexpected error:', error);
      throw error;
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
         axiosError.response?.data.error.includes('Token verification failed')
      ) {
         console.log('BEBRA');

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

// export const getCardsApi = async ({
//    type,
//    page,
//    date,
//    price,
// }: TCatalogParams): Promise<ILoftCard[]> => {
//    try {
//       const response = await fetchAuth<ILoftCard[]>({
//          url: '/catalog',
//          method: 'GET',
//          headers: {
//             Authorization: `Bearer ${getCookie('accessToken')}`,
//          },
//          params: { type, page, date, price },
//       });

//       return response;
//    } catch (error) {
//       catchError(error);
//       throw error;
//    }
// };

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
      const response = await api.post<TAuthResponse>(
         `/auth/registration`,
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

export const authUserApi = async () => {
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

export const logoutApi = async () => {
   try {
      const response = await api.post<TServerResponse<{}>>(
         '/user/logout',
         { token: localStorage.getItem('refreshToken') },
         {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
         }
      );

      return checkResponse<TServerResponse<{}>>(response);
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
