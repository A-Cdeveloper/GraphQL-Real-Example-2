import Cookies from "js-cookie";

// Modern cookie utilities using js-cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const getAuthState = () => {
  const userCookie = getCookie("user");
  if (!userCookie) return { user: null, isLoggedIn: false };

  try {
    const user = JSON.parse(userCookie);
    return { user, isLoggedIn: true };
  } catch {
    return { user: null, isLoggedIn: false };
  }
};
