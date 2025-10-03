import { routes } from "@/providers/router/routes";

import TopNavlink from "./TopNavlink";

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <TopNavlink to={routes.cars}>Cars</TopNavlink>
      <TopNavlink to={routes.brands}>Brands</TopNavlink>
      <TopNavlink to={routes.addCar}>Add Car</TopNavlink>
    </nav>
  );
};

export default Navigation;
