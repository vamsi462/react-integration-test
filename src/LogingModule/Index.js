import { Login } from "./components/Login";
import { useLogin } from "./hooks/useLogin";

export function LoginModule() {
  const { state, onSubmit } = useLogin();
  return <Login onSubmit={onSubmit} state={state} />;
}
