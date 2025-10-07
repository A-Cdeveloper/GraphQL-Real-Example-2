export const routes = {
  home: "/",
  cars: "/cars",
  addCar: "/cars/add-car",
  singleCar: ":id",
  brands: "/brands",
  colors: "/colors",
  login: "/login",
} as const;

export type RouteKey = keyof typeof routes;
