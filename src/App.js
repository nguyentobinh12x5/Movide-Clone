import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import RootLayout from "./Root/RootLayout";
import Search from "./pages/search/Search";
import NotFound from "./pages/Error/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Browse /> },
      { path: "/search", element: <Search /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
