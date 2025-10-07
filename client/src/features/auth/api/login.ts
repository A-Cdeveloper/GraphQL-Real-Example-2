export const login = async (email: string, password: string) => {
  const response = await fetch(
    `/api/auth/login`, // Use proxy instead of full URL
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await response.json();
  return data;
};
