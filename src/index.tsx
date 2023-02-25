// React imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Component imports
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <p>Home</p> },
      {
        path: 'my-list',
        element: <p>My List</p>
      },
      {
        path: 'series',
        element: <p>Series</p>
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
