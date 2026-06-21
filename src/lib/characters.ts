import type { Character, CharactersInfo } from '../api/richAndMorty';
import { CACHE_TTL } from '../config/env';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export type CharactersResponse = {
  info: CharactersInfo;
  results: Character[];
};

type GetCharactersArgs = {
  search?: string;
  page?: number;
};

export async function getCharacters({
  search,
  page,
}: GetCharactersArgs): Promise<CharactersResponse | null> {
  const params = new URLSearchParams();
  if (search) {
    params.set('name', search);
  }
  if (page) {
    params.set('page', String(page));
  }
  const queryString = params.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, { next: { revalidate: CACHE_TTL } });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getCharacter(id: string): Promise<Character | null> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`, {
    next: { revalidate: CACHE_TTL },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
