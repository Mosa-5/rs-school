import type { CardItem } from '../store/selectedItemsSlice';

const DETAILS_BASE_URL = 'https://rickandmortyapi.com/api/character';

const escapeCsvValue = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

export const buildCsv = (items: CardItem[]): string => {
  const header = ['id', 'name', 'description', 'detailsUrl'];
  const rows = items.map((item) => [
    String(item.id),
    item.title,
    item.description,
    `${DETAILS_BASE_URL}/${item.id}`,
  ]);

  return [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');
};
