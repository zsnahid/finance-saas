"use client";
import { login } from "@/lib/actions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function Login() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div>
      <form action={formAction} className="*:border *:border-black">
        <input type="text" id="username" name="username" />
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <p>{state.message}</p>
    </div>
  );
}
