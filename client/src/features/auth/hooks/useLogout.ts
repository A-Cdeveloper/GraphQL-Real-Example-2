import { useNavigate } from "react-router";
import { logout } from "../api/logout";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear user cookie immediately for instant UI update
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Immediate redirect for better UX
    navigate("/login");

    // Clear all cookies in background
    logout(navigate).catch(console.error);
  };

  return { logout: handleLogout };
};
