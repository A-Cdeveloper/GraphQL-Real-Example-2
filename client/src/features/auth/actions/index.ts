import { login } from "../api/login";

export type LoginState = {
  error: string;
  success: boolean;
  user?: {
    email: string;
    password: string;
  };
};

export const loginAction = async (
  prevState: unknown,
  formData: FormData
): Promise<LoginState> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await login(email, password);

    if (response.error) {
      return {
        error: response.error,
        success: false,
        user: {
          email,
          password,
        },
      };
    }

    return { success: true, error: "" };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      success: false,
      user: { email: "", password: "" },
    };
  }
};
