import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuthState } from "@/lib/cookies";
import Loading from "@/components/ui/Loading";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const ProtectedRoute = ({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = getAuthState();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo, isLoggedIn]);

  // Show loading while checking auth
  if (!isLoggedIn) {
    return <Loading size="lg" className="py-8" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
