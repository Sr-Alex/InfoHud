import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import InicioPage from './routes/InicioPage/InicioPage.jsx';
import LoginPage from './routes/LoginPage/LoginPage.jsx';
import PostagensPage from './routes/PostagensPage/PostagensPage.jsx';
import CriarPostPage from './routes/CriacaoPage/CriarPostPage.jsx';

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
