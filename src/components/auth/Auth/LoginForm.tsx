"use client";

import { useState, type FormEvent } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/features/authSlice";
import { signInFormStyles as s } from "./AuthForm.styles";
import type { SignInFormProps } from "./AuthForm.types";
import Button from "@/components/uiComponents/Button";

export function LoginForm({ onSuccess }: SignInFormProps) {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(loginUser({ phone, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        onSuccess?.();
      } else {
        setError((resultAction.payload as string) || "Invalid phone number or password. Please try again.");
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
        <label htmlFor="login-phone" className={s.label}>Phone Number</label>
        <input
          id="login-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        Password is a combination of your your Player ID and Date of Birth (DOB) in the format: PlayerIDDDMMYYYY.
        Example: If your Player ID is 3434 and your Date of Birth is 06/06/1993, your password is 343406061993.
      </div>

      {error && <p className={s.error}>{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
