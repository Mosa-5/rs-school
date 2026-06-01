import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, CharactersInfo } from '../api/richAndMorty';
import { CACHE_TTL } from '../config/env';

export type CharactersResponse = {
  info: CharactersInfo;
  results: Character[];
};

type CharactersQueryArgs = {
  search?: string;
  page?: number;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, CharactersQueryArgs>({
      query: ({ search, page }) => {
        const params = new URLSearchParams();
        if (search) {
          params.set('name', search);
        }
        if (page) {
          params.set('page', String(page));
        }
        const queryString = params.toString();
        return `/character${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Characters'],
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = apiSlice;
