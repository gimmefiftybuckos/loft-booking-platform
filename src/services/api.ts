import axios from 'axios';
import { ILoftCard, TCatalogParams } from '../types';
import { API_URL } from './constants';

const api = axios.create({
   baseURL: API_URL,
});

export const asyncGetCardsApi = async ({
   type,
   page,
   date,
   price,
}: TCatalogParams) => {
   const query = { params: { type, page, date, price } };

   try {
      const response = await api.get<ILoftCard[]>('/catalog', query);

      return response.data || null;
   } catch (error) {
      throw new Error();
   }
};
