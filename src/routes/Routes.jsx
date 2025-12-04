import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: '/services',
        
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: ()=> fetch('/warehouses.json').then(res=> res.json())
      },
      {
        path: '/aboutUs',
        
      },
      {
        path: '/pricing',
        
      },
      {
        path: '/beArider',
        
      },
    ],
  },
]);
