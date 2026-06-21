import { getCharacters, getCharacter } from '../characters';
import {
  installFetchMock,
  makeCharacter,
  charactersResponse,
  lastFetchUrl,
} from '../../test-utils/fetchMock';

describe('characters lib', () => {
  test('getCharacters builds a query with name and page', async () => {
    const fetchMock = installFetchMock(() => ({
      body: charactersResponse([makeCharacter()], 3),
    }));

    const data = await getCharacters({ search: 'rick', page: 2 });

    expect(data?.results).toHaveLength(1);
    expect(lastFetchUrl(fetchMock)).toContain('name=rick');
    expect(lastFetchUrl(fetchMock)).toContain('page=2');
  });

  test('getCharacters returns null on an error response', async () => {
    installFetchMock(() => ({ status: 404, body: { error: 'nope' } }));
    const data = await getCharacters({ search: 'zzzzz' });
    expect(data).toBeNull();
  });

  test('getCharacter fetches a single character by id', async () => {
    const fetchMock = installFetchMock(() => ({
      body: makeCharacter({ id: 5, name: 'Beth' }),
    }));

    const character = await getCharacter('5');

    expect(character?.name).toBe('Beth');
    expect(lastFetchUrl(fetchMock)).toContain('/character/5');
  });

  test('getCharacter returns null on an error response', async () => {
    installFetchMock(() => ({ status: 500, body: {} }));
    expect(await getCharacter('999')).toBeNull();
  });
});
