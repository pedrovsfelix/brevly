import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Redirect } from "./pages/Redirect";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:code',
    element: <Redirect />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function App() {

  return <RouterProvider router={router} />;

}
