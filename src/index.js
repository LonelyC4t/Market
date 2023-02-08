import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  Form,
  RouterProvider
} from "react-router-dom";
import { ProductPage } from './Components/Pages/ProductPage/ProductPage';
import {FormsIn, FormsUp} from "../src/Components/Pages/Form/Form"
import { UserPage } from './Components/Pages/UserPage/UserPage';



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
    element: <FormsIn />,
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

