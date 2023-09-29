import React from "react";
import ReactDOM from "react-dom/client";
import { IndexPage } from "./pages/IndexPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthPage } from "./pages/AuthPage";
import { Layout } from "./utils/Layout";
import { MessagePage } from "./pages/MessagePage";
import { StreamPage } from "./pages/StreamPage";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/message", element: <MessagePage /> },
      { path: "/streams/:streamId", element: <StreamPage /> },
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
