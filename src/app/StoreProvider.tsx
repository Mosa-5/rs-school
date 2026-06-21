'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => setupStore());

  return <Provider store={store}>{children}</Provider>;
}
