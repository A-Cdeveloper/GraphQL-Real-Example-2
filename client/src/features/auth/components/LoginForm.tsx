import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import { loginAction, type LoginState } from "../actions";

const LoginForm = () => {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(
    loginAction,
    {} as LoginState
  );

  // Redirect on successful login
  useEffect(() => {
    if (state?.success) {
      navigate("/cars");
    }
  }, [state?.success, navigate]);

  return (
    <form
      className="flex flex-col gap-4 bg-white p-8 w-full max-w-xs shadow-md"
      action={formAction}
    >
      <Input type="email" placeholder="Email" name="email" required />
      <Input type="password" placeholder="Password" name="password" required />

      {state?.error && <div className="text-danger text-sm">{state.error}</div>}

      {state?.success && (
        <div className="text-success text-sm">Login successful!</div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
