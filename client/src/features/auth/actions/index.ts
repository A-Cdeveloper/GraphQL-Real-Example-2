import { login } from "../api/login";

export type LoginErrorState = {
  error: string;
  success: boolean;
};

export type LoginSuccessState = {
  error: string;
  success: boolean;
};

export type LoginState = LoginErrorState | LoginSuccessState;

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
    };
  }
};
