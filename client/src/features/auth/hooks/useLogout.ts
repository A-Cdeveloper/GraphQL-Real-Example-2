import { useNavigate } from "react-router";
import { logout } from "../api/logout";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Immediate redirect for better UX
    navigate("/login");

    // Clear cookies in background
    logout(navigate).catch(console.error);
  };

  return { logout: handleLogout };
};
