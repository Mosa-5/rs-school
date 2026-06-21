import { buildCsv } from '../../../utils/buildCsv';
import type { CardItem } from '../../../store/selectedItemsSlice';

export async function POST(request: Request) {
  const formData = await request.formData();
  const raw = String(formData.get('items') ?? '[]');

  let items: CardItem[] = [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      items = parsed as CardItem[];
    }
  } catch {
    items = [];
  }

  const csv = buildCsv(items);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="characters.csv"',
    },
  });
}
