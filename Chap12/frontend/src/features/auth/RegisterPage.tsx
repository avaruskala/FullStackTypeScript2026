import { useActionState } from "react";
import { register } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../store/StoreHooks";
import { useNavigate } from "react-router";

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  const [, submitAction, isPending] = useActionState(
    async (_prev: null, fromData: FormData) => {
      const email = fromData.get("email") as string;
      const password = fromData.get("password") as string;
      const username = fromData.get("username") as string;

      const result = await dispatch(register({ email, password, username }));
      if (register.fulfilled.match(result)) {
        navigate("/", { replace: true });
      }
      return null;
    }, null);

  return (
    <form action={submitAction}>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input name="username" placeholder="Username" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
