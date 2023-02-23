import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { ProductPage } from './Components/Pages/ProductPage/ProductPage';
import {FormsIn } from "../src/Components/Pages/Form/Form"
import {FormsUp} from "./Components/Pages/Form/FormReg"
import { UserPage } from './Components/Pages/UserPage/UserPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRouter } from './Components/privateRouter/privatRouter';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <PrivateRouter> <ProductPage /> </PrivateRouter>
      },
      {
        path: "me",
        element: <PrivateRouter> <UserPage /> </PrivateRouter>
      },
      {
        path: "signin",
        element: <FormsIn />,
      },
      {
        path: "signup",
        element: <FormsUp />
      }
    ]
  }, 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} /> 
    </QueryClientProvider>
  </React.StrictMode>
);

