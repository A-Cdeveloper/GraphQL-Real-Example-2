import { routes } from "./routes";
import AppLayout from "@/components/layout/AppLayout";
import { createBrowserRouter } from "react-router";
import CarsPage from "@/pages/CarsPage";
import HomePage from "@/pages/HomePage";
import AddCar from "@/pages/AddCar";
import SingleCarPage from "@/pages/SingleCarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <NotFoundPage />,
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
            element: <AddCar />,
          },
        ],
      },
    ],
  },
]);
