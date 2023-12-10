import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// console.log("IMPORT");
// import "./context";

import { Layout } from "./utils/Layout";
import { AuthPage } from "./pages/AuthPage";
import { MessagePage } from "./pages/MessagePage";
import { StreamsPage } from "./pages/StreamsPage";
// import { StreamPage } from "./pages/StreamPage";
import { MessageNewPage } from "./pages/MessageNewPage";
import { RootStore } from "./stores/RootStore";
import { RootContext } from "./context";

import "./index.css";

// import { RootStore } from "./stores/RootStore";

// globalThis.root
// globalThis.roo

// globalThis.rootStore

// console.log("MAIN");

// globalThis.ro

// rootStore = new RootStore();

// console.log("QQQQ");
// console.log(rootStore);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <StreamsPage /> },
      { path: "/messages", element: <MessageNewPage /> },
      { path: "/messages/:messageId", element: <MessagePage /> },
      // { path: "/streams/:streamId", element: <StreamPage /> },
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
