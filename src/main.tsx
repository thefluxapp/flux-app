import React from "react";
import ReactDOM from "react-dom/client";
import { IndexPage } from "./pages/IndexPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthPage } from "./pages/AuthPage";
import { Layout } from "./utils/Layout";
// import './index.css'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
