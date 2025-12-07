import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../Auth/Auth Layout/AuthLayout";
import LoginPage from "../Auth/Auth Pages/Login Page/LoginPage";
import RegisterPage from "../Auth/Auth Pages/Register Page/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Be A Rider/Rider";
import SendParcel from "../pages/Send Parcel/SendParcel";
import DashLayout from "../Layouts/DashLayout";
import MyParcels from "../pages/Dashboard/My Parcels/MyParcels";
import PaymentPage from "../pages/Dashboard/Payment Page/PaymentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/services",
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/aboutUs",
      },
      {
        path: "/pricing",
      },
      {
        path: "/sendParcel",
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "/beArider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: LoginPage,
      },
      {
        path: "/auth/register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashLayout/>
    </PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: PaymentPage
      }
    ]
  }
]);
