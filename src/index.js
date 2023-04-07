import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { ProductPage } from './pages/ProductPage/ProductPage';
import {FormsIn } from "./pages/Form/Form"
import {FormsUp} from "./pages/Form/FormReg"
import { UserPage } from './pages/UserPage/UserPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRouter } from './components/PrivateRouter/PrivatRouter';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import { Cart } from './pages//Cart/Cart';
import { DetailPage } from './pages/DetailPage/DetailPage';


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
        path: "products/:idOfProduct",
        element: <DetailPage />
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
      },
      {
        path: "cart",
        element: <PrivateRouter> <Cart/> </PrivateRouter>
      }
    ]
  }, 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> 
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

