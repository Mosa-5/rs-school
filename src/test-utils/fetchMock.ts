import type { Character } from '../api/richAndMorty';

export const makeCharacter = (
  overrides: Partial<Character> = {}
): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  ...overrides,
});

export const charactersResponse = (
  results: Character[] = [],
  pages = 1
) => ({
  info: { count: results.length, pages },
  results,
});

type MockResult = { status?: number; body: unknown };

const getRequestUrl = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
};

export const installFetchMock = (resolve: (url: string) => MockResult) => {
  const fetchMock = jest.fn(async (input: RequestInfo | URL) => {
    const url = getRequestUrl(input);
    const { status = 200, body } = resolve(url);
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  });

  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

export const lastFetchUrl = (fetchMock: jest.Mock): string => {
  const { calls } = fetchMock.mock;
  return getRequestUrl(calls[calls.length - 1][0]);
};

export const fetchedUrls = (fetchMock: jest.Mock): string[] =>
  fetchMock.mock.calls.map((call) => getRequestUrl(call[0]));
