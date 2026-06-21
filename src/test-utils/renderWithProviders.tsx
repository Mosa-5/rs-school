import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';
import { setupStore } from '../store/store';
import messages from '../../messages/en.json';

export function renderWithProviders(ui: ReactElement) {
  const store = setupStore();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
