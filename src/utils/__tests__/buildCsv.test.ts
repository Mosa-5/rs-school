import { buildCsv } from '../buildCsv';
import type { CardItem } from '../../store/selectedItemsSlice';

const items: CardItem[] = [
  { id: 1, title: 'Rick', description: 'Human | Alive' },
  { id: 2, title: 'Morty, Jr', description: 'Human | "Alive"' },
];

describe('buildCsv', () => {
  test('returns only the header for an empty selection', () => {
    expect(buildCsv([])).toBe('id,name,description,detailsUrl');
  });

  test('builds a row per item with a details url', () => {
    const lines = buildCsv(items).split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[1]).toBe(
      '1,Rick,Human | Alive,https://rickandmortyapi.com/api/character/1'
    );
  });

  test('escapes commas and quotes', () => {
    const lines = buildCsv(items).split('\n');
    expect(lines[2]).toContain('"Morty, Jr"');
    expect(lines[2]).toContain('"Human | ""Alive"""');
  });
});
