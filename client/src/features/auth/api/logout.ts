export const logout = async (navigate?: (path: string) => void) => {
  try {
    // Call server logout endpoint to clear httpOnly cookies
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Important: include cookies
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Redirect to login page
    if (navigate) {
      navigate("/login");
    } else {
      // Fallback to window.location if navigate not provided
      window.location.href = "/login";
    }
  }
};
