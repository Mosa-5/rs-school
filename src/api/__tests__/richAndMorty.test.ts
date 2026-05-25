import { fetchCharacters } from '../richAndMorty';

const mockResponse = (body: unknown, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => body,
});

describe('fetchCharacters', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('requests /character with no query when search is omitted', async () => {
    fetchMock.mockResolvedValue(mockResponse({ results: [] }));

    await fetchCharacters();

    const calledWith = fetchMock.mock.calls[0][0] as URL;
    expect(calledWith.pathname).toBe('/api/character');
    expect(calledWith.searchParams.has('name')).toBe(false);
  });

  test('appends ?name=<search> when search is provided', async () => {
    fetchMock.mockResolvedValue(mockResponse({ results: [] }));

    await fetchCharacters({ search: 'rick' });

    expect((fetchMock.mock.calls[0][0] as URL).searchParams.get('name')).toBe(
      'rick'
    );
  });

  test('returns parsed JSON on a successful response', async () => {
    const payload = {
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
      ],
    };
    fetchMock.mockResolvedValue(mockResponse(payload));

    expect(await fetchCharacters()).toEqual(payload);
  });

  test('throws when the response is not ok', async () => {
    fetchMock.mockResolvedValue(mockResponse({}, false, 500));

    await expect(fetchCharacters()).rejects.toThrow('Request failed: 500');
  });
});
