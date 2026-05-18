import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './index.css';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import Details from './routes/Details.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<Home />}>
              <Route index element={null} />
              <Route path="details/:detailsId" element={<Details />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
