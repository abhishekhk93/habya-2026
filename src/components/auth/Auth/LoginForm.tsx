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

    const normalizedPhone = phone.replace(/\D/g, "");
    const normalizedPassword = password.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!/^\d{12}$/.test(normalizedPassword)) {
      setError("Password must be exactly 12 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(
        loginUser({ phone: normalizedPhone, password: normalizedPassword })
      );
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
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={s.input}
          autoComplete="off"
          inputMode="numeric"
          maxLength={10}
          pattern="\d{10}"
          required
        />
      </div>

      <div className={s.inputGroup}>
        <label htmlFor="login-password" className={s.label}>Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 12))}
          className={s.input}
          autoComplete="off"
          inputMode="numeric"
          maxLength={12}
          pattern="\d{12}"
          required
        />
      </div>

      <div className={s.infoBox}>
        <strong className="text-black font-medium block mb-1">Welcome back!</strong>
        Password = PlayerID + Date of birth. Ex: 2255 + 11081998 → 225511081998
      </div>

      <p className={s.error}>{error || "\u00A0"}</p>
      <Button btnType="small" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
