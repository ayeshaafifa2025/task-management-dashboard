import { createBrowserRouter } from "react-router";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>
  },
   {
        path: '/*',
        element: <Error></Error>
      },
]);