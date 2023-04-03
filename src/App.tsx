import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootRoute } from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}


