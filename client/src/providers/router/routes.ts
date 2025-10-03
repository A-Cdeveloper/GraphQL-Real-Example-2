export const routes = {
  home: "/",
  cars: "/cars",
  addCar: "add-car",
  singleCar: ":id",
  brands: "/brands",
  colors: "/colors",
} as const;

export type RouteKey = keyof typeof routes;
