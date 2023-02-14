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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <ProductPage />
      },
      {
        path: "me",
        element: <UserPage></UserPage>
      }
    ]
  }, 
  {
    path: "signin",
    element: <QueryClientProvider client={queryClient}>
       <FormsIn />
      </QueryClientProvider>,

    children: [
      {
        path: "signup",
        element: <FormsUp></FormsUp>    
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);

