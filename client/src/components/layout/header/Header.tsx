import Button from "@/components/ui/Button";
import Navigation from "../navigation/Navigation";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import { routes } from "@/providers/router/routes";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <Navigation />

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(routes.addCar)}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
