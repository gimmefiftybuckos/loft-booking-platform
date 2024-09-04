import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoftCard } from '../types';

type paramsType = {
   type: string;
   page: number;
   date: string;
   price: string;
};

export const getLoftsData = createAsyncThunk(
   'cards/getLoftsData',
   async ({ type, page, date, price }: paramsType) => {
      const query = { params: { type, page, date, price } };

      console.log(query);

      try {
         const response = await axios.get<ILoftCard[]>(
            'http://localhost:3000/catalog',
            query
         );
         return response.data;
      } catch (error) {
         throw new Error();
      }
   }
);

export const asyncGetHomeContainerData = async (type: string) => {
   const query = type ? { params: { type } } : {};
   try {
      const response = await axios.get<ILoftCard[]>(
         'http://localhost:3000/catalog',
         query
      );

      return response.data || null;
   } catch (error) {
      throw new Error();
   }
};
