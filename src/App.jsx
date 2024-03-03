import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Products from "./Component/Products/Products";
import NotFoundPage from "./Component/NotFoundPage/NotFoundPage";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Card from "./Component/Cart/Card";
import Categories from "./Component/Categories/Categories";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetals from "./Component/ProductDetals/ProductDetals";
import CartConextProvider from "./Context/CartConext";
import { Toaster } from "react-hot-toast";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: " ", element: <Register /> },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "Card",
        element: (
          <ProtectedRoute>
            <Card />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetals/:id",
        element: (
          <ProtectedRoute>
            <ProductDetals />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  const x = new QueryClient();
  return (
    <>
      <QueryClientProvider client={x}>
        <CartConextProvider>
          <AuthContextProvider>
            <RouterProvider router={myRouter} />
          </AuthContextProvider>
        </CartConextProvider>
      </QueryClientProvider>
      <Toaster/>
    </>
  );
}
