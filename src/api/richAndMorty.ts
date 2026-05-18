const BASE_URL = 'https://rickandmortyapi.com/api';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
};

export type CharactersInfo = {
  count: number;
  pages: number;
};

type CharactersResponse = {
  info: CharactersInfo;
  results: Character[];
};

export async function fetchCharacters(
  params: { search?: string; page?: number } = {}
): Promise<CharactersResponse> {
  const url = new URL(`${BASE_URL}/character`);

  if (params.search) {
    url.searchParams.set('name', params.search);
  }
  if (params.page) {
    url.searchParams.set('page', String(params.page));
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
