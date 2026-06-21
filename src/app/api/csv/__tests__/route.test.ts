import { POST } from '../route';

function csvRequest(items: string): Request {
  const form = new FormData();
  form.set('items', items);
  return new Request('http://localhost/api/csv', {
    method: 'POST',
    body: form,
  });
}

describe('CSV route handler', () => {
  test('returns a CSV attachment for the selected items', async () => {
    const response = await POST(
      csvRequest(
        JSON.stringify([{ id: 1, title: 'Rick', description: 'Human | Alive' }])
      )
    );

    expect(response.headers.get('content-type')).toContain('text/csv');
    expect(response.headers.get('content-disposition')).toContain('attachment');

    const body = await response.text();
    expect(body).toContain('id,name,description,detailsUrl');
    expect(body).toContain('Rick');
  });

  test('falls back to an empty selection on invalid payload', async () => {
    const response = await POST(csvRequest('not json'));
    const body = await response.text();
    expect(body).toBe('id,name,description,detailsUrl');
  });
});
