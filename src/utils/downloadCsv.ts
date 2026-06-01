import type { CardItem } from '../components/cardList/cardList';

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

export const downloadCsv = (items: CardItem[]): void => {
  const csv = buildCsv(items);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}_items.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
