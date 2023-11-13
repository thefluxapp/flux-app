import React from "react";
import ReactDOM from "react-dom/client";
import { IndexPage } from "./pages/IndexPage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthPage } from "./pages/AuthPage";
import { MessagePage } from "./pages/MessagePage";
import { StreamPage } from "./pages/StreamPage";
import { Layout } from "./utils/Layout";

// import { register } from "./worker";

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

const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration(
  new URL("./worker.ts", import.meta.url),
);

// const serviceWorkerRegistrations =
//   await navigator.serviceWorker.getRegistrations();

// console.log("serviceWorkerRegistration");
// console.log(serviceWorkerRegistration);
// console.log("serviceWorkerRegistrations");
// console.log(serviceWorkerRegistrations);

if (!serviceWorkerRegistration) {
  const qq = await navigator.serviceWorker.register(
    new URL("./worker.ts", import.meta.url),
    {
      type: "module",
    },
  );

  console.log("qq");
  console.log(qq);
}
