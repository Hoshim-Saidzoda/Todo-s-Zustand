import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SyncPage from "./pages/sync";
import Layout from "./layout/layout";
import Async from "./pages/async";
import AboutById from "./pages/InfoById";
import SyncById from "./pages/SyncById"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <SyncPage /> },
      { path: "async", element: <Async /> },  
{ path: "async/:id", element: <AboutById /> },
{
  path: "/sync/:id",
  element: <SyncById />,
}
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
