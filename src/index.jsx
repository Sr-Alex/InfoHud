import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import InicioPage from './routes/InicioPage/InicioPage';
import LoginPage from './routes/LoginPage/LoginPage';
import PostagensPage from './routes/PostagensPage/PostagensPage';
import CriarPostPage from './routes/CriacaoPage/CriarPostPage';

import './index.css';

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
        element: <CriarPostPage/>
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
