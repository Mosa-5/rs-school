const BASE_URL = 'https://rickandmortyapi.com/api';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
};

type CharactersResponse = {
  results: Character[];
};

export async function fetchCharacters(
  params: { search?: string } = {}
): Promise<CharactersResponse> {
  const url = new URL(`${BASE_URL}/character`);

  if (params.search) {
    url.searchParams.set('name', params.search);
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
