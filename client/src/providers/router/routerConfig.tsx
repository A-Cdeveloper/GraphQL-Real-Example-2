import { routes } from "./routes";
import AppLayout from "@/components/layout/AppLayout";
import { createBrowserRouter } from "react-router";
import CarsPage from "@/pages/CarsPage";
import HomePage from "@/pages/HomePage";
import AddCar from "@/pages/AddCar";
import SingleCarPage from "@/pages/SingleCarPage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.cars,
        children: [
          {
            index: true,
            element: <CarsPage />,
          },
          {
            path: routes.singleCar,
            element: <SingleCarPage />,
          },
          {
            path: routes.addCar,
            element: (
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: routes.login,
        element: <LoginPage />,
      },
    ],
  },
]);
