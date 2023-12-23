import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import InicioPage from './routes/InicioPage/InicioPage';
import LoginPage from './routes/LoginPage/LoginPage';
import PostagensPage from './routes/PostagensPage/PostagensPage';
import CriacaoPage from './routes/CriacaoPage/CriacaoPage';

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <InicioPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'postagens',
        element: <PostagensPage/>
      },
      {
        path: 'postagens/criar',
        element: <CriacaoPage/>
      },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
