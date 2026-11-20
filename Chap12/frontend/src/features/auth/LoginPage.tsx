import { useActionState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { login } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../store/StoreHooks";


export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useAppSelector((state) => state.auth);
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const [, submitAction, isPending] = useActionState(
    async (_prev: null, fromData: FormData) => {
      const email = fromData.get("email") as string;
      const password = fromData.get("password") as string;

      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate(from, { replace: true });
      }
      return null;
    }, null);

  return (
    <form action={submitAction}>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>}
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Log In"}
      </button>
      <p>
        Don't have an account? <Link to="/register" >Register</Link>
      </p>
    </form>
  );
}
