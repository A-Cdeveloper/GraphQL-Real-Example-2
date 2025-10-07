import Button from "@/components/ui/Button";
import Navigation from "../navigation/Navigation";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import { routes } from "@/providers/router/routes";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getAuthState } from "@/lib/cookies";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user, isLoggedIn } = getAuthState();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <Navigation isLoggedIn={isLoggedIn} />

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(routes.login)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
