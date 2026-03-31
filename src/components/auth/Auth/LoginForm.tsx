"use client";

import { useState, type FormEvent } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/features/authSlice";
import { signInFormStyles as s } from "./AuthForm.styles";
import type { SignInFormProps } from "./AuthForm.types";

export function LoginForm({ onSuccess }: SignInFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(loginUser({ name, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        onSuccess?.();
      } else {
        setError((resultAction.payload as string) || "Invalid name or password. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.inputGroup}>
        <label htmlFor="login-name" className={s.label}>Name</label>
        <input
          id="login-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={s.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={s.inputGroup}>
        <label htmlFor="login-password" className={s.label}>Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={s.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={s.infoBox}>
        <strong className="text-black font-medium block mb-1">Welcome back!</strong>
        Password is a combination of your Profile ID and Date of Birth (DOB) in the format: DDMMYYYY.
        Example: If your Profile ID is 1234 and your Date of Birth is 11/01/2000, your password is 123411012000.
      </div>

      {error && <p className={s.error}>{error}</p>}

      <button type="submit" disabled={isSubmitting} className={s.submitButton}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
