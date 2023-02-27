// React imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
// Component imports
import HomePage from './pages/HomePage/HomePage';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import SeriesPage from './pages/SeriesPage/SeriesPage';
import AdditionalSections from './components/AdditionalSections/AdditionalSections';

const router = createHashRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'bonus-section',
        element: <AdditionalSections />
      },
      {
        path: 'series',
        element: <SeriesPage />
      },
      {
        path: 'movies',
        element: <MoviesPage />
      }
    ]
  }
]);

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
