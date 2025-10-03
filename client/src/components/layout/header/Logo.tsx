import { routes } from "@/providers/router/routes";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to={routes.home}
      className="font-nunito font-bold text-xl lg:text-2xl tracking-tight uppercase"
    >
      Car Shop
    </Link>
  );
};

export default Logo;
