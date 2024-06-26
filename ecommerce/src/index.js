import React from 'react';
import ReactDOM from 'react-dom/client';
import Brand from './Brand'; 
import Products from './products';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './register';
import ProductDet from './ProductDet';
import Login from './login';
import Book from './book';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/brand/:branding",
    element:<Products />
  },
  {
    path:"/product/:id",
    element:<ProductDet />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/buy",
    element:<Book/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

