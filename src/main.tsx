import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import { RootContext } from "./context";
import { AuthPage } from "./pages/AuthPage";
import { MessageNewPage } from "./pages/MessageNewPage";
import { MessagePage } from "./pages/MessagePage";
import { StreamsPage } from "./pages/StreamsPage";
import { RootStore } from "./stores/RootStore";
import { Layout } from "./utils/Layout";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      console.log("Q");

      return redirect("/streams");
    },
  },
  {
    element: <Layout />,
    children: [
      { path: "/streams", element: <StreamsPage /> },
      { path: "/messages", element: <MessageNewPage /> },
      { path: "/messages/:messageId", element: <MessagePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootContext.Provider value={new RootStore()}>
      <RouterProvider router={router} />
    </RootContext.Provider>
  </React.StrictMode>,
);
