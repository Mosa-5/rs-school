'use server';

import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export async function searchAction(formData: FormData) {
  const query = String(formData.get('q') ?? '').trim();
  const locale = await getLocale();

  const params = new URLSearchParams();
  if (query) {
    params.set('q', query);
  }
  const queryString = params.toString();

  redirect(`/${locale}${queryString ? `?${queryString}` : ''}`);
}
