import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '../context/ThemeProvider';
import App from '../App';
import Home from '../routes/Home';
import Details from '../routes/Details';
import About from '../routes/About';
import NotFound from '../routes/NotFound';
import { setupStore } from '../store/store';
import {
  charactersResponse,
  fetchedUrls,
  installFetchMock,
  makeCharacter,
} from '../test-utils/fetchMock';

const pagedHandler = (url: string) => {
  const page = new URL(url).searchParams.get('page') ?? '1';
  return {
    body: charactersResponse(
      [makeCharacter({ id: Number(page), name: `Character p${page}` })],
      3
    ),
  };
};

const countPageOneFetches = (fetchMock: jest.Mock) =>
  fetchedUrls(fetchMock).filter((url) => {
    const params = new URL(url).searchParams;
    return params.get('page') === '1' && !params.has('name');
  }).length;

const renderApp = () =>
  render(
    <Provider store={setupStore()}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<Home />}>
                <Route index element={null} />
                <Route path="details/:detailsId" element={<Details />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('RTK Query caching', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('returns to a visited page from cache without refetching', async () => {
    const user = userEvent.setup();
    const fetchMock = installFetchMock(pagedHandler);

    renderApp();

    await screen.findByRole('heading', { name: 'Character p1' });
    expect(countPageOneFetches(fetchMock)).toBe(1);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await screen.findByRole('heading', { name: 'Character p2' });

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    await screen.findByRole('heading', { name: 'Character p1' });

    expect(countPageOneFetches(fetchMock)).toBe(1);
  });

  test('Refresh invalidates the cache and triggers a refetch', async () => {
    const user = userEvent.setup();
    const fetchMock = installFetchMock(pagedHandler);

    renderApp();

    await screen.findByRole('heading', { name: 'Character p1' });
    expect(countPageOneFetches(fetchMock)).toBe(1);

    await user.click(screen.getByRole('button', { name: 'Refresh' }));

    await waitFor(() => expect(countPageOneFetches(fetchMock)).toBe(2));
  });
});
