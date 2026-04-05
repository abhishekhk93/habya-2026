"use client";

import { useState, useRef, type FormEvent, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createUser } from "@/store/features/authSlice";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { signInFormStyles as s } from "./AuthForm.styles";
import type { SignInFormProps } from "./AuthForm.types";
import Button from "@/components/uiComponents/Button";

export function RegisterForm({ onSuccess }: SignInFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Custom Dropdown State
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dobInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Close dropdown on outside click
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGenderOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!gender) {
      setError("Please select your gender.");
      return;
    }
    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }
    if (!captchaToken) {
      setError("Please complete the CAPTCHA security check.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(createUser({ name, phone, gender, dob, captchaToken }));
      if (createUser.fulfilled.match(resultAction)) {
        onSuccess?.();
      } else {
        setError((resultAction.payload as string) || "Registration failed. Please try again.");
        turnstileRef.current?.reset();
        setCaptchaToken("");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      turnstileRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.inputGroup}>
        <label htmlFor="reg-name" className={s.label}>Name</label>
        <input
          id="reg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={s.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={s.inputGroup}>
        <label htmlFor="reg-phone" className={s.label}>Phone</label>
        <input
          id="reg-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={s.input}
          autoComplete="off"
          required
        />
      </div>

      <div className={s.inputGroup} ref={dropdownRef}>
        <label className={s.label}>Gender</label>
        <div className="relative">
          <div
            onClick={() => setIsGenderOpen(!isGenderOpen)}
            className={`${s.input} flex items-center justify-between cursor-pointer`}
          >
            <span className={gender ? "text-black capitalize" : "text-black/40"}>
              {gender}
            </span>
            <span className="text-black/40 text-sm">▼</span>
          </div>

          {isGenderOpen && (
            <ul className="absolute top-[110%] left-0 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 overflow-hidden">
              {['Male', 'Female', 'Other'].map(opt => (
                <li
                  key={opt}
                  onClick={() => { setGender(opt.toLowerCase()); setIsGenderOpen(false); }}
                  className="px-5 py-3 hover:bg-black/5 cursor-pointer text-base font-light text-black transition-colors"
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={s.inputGroup}>
        <label className={s.label}>Date of Birth</label>
        <div
          onClick={() => {
            try {
              dobInputRef.current?.showPicker();
            } catch (e) {
              dobInputRef.current?.focus();
            }
          }}
          className={`${s.input} flex items-center justify-between cursor-pointer relative overflow-hidden`}
        >
          <span className={dob ? "text-black" : "text-black/40"}>
            {dob ? new Date(dob).toLocaleDateString('en-GB') : ""}
          </span>
          <span className="text-black/40 opacity-70">📅</span>

          <input
            ref={dobInputRef}
            type="date"
            value={dob}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDob(e.target.value)}
            className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
            tabIndex={-1}
          />
        </div>
      </div>

      <div className={s.inputGroup}>
        <p className="text-[11px] text-black/40 mb-2 uppercase tracking-widest font-semibold flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Security Check
        </p>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onSuccess={(token) => {
            setCaptchaToken(token);
            setError("");
          }}
          onError={() => setError("CAPTCHA verification failed. Please try again.")}
          onExpire={() => setCaptchaToken("")}
        />
      </div>

      {error && <p className={s.error}>{error}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
