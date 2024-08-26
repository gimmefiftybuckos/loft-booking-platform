import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoftCard } from '../types';

type paramsType = {
   type: string;
   page: number;
   date: string;
};

export const getLoftsData = createAsyncThunk(
   'cards/getLoftsData',
   async ({ type, page, date }: paramsType) => {
      const query = { params: { type, page, date } };

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

export const asyncGetHomeContainerData = async (filter: string) => {
   const query = filter ? { params: { filter } } : {};
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
