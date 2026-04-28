"use client";

import { useState, useRef, type FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupUser } from "@/store/features/authSlice";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { signInFormStyles as s } from "./AuthForm.styles";
import type { SignInFormProps } from "./AuthForm.types";
import Button from "@/components/uiComponents/Button";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export function RegisterForm({ onSuccess }: SignInFormProps) {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const isCaptchaEnabled = useAppSelector((state) => state.config.data?.is_captcha_enabled ?? true);

  // Custom Dropdown State
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const trimmedName = fullName.trim();
    const normalizedPhone = phone.replace(/\D/g, "");
    const normalizedGender = gender.toLowerCase();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^\d{10}$/.test(normalizedPhone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!gender) {
      setError("Please select your gender.");
      return;
    }
    if (!["male", "female"].includes(normalizedGender)) {
      setError("Gender must be Male or Female.");
      return;
    }
    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }
    if (isCaptchaEnabled && !captchaToken) {
      setError("Please complete the CAPTCHA security check.");
      return;
    }

    setIsSubmitting(true);

    try {
      const parts = dob.split('-');
      const formattedDob = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dob;

      const resultAction = await dispatch(
        signupUser({
          fullName: trimmedName,
          phone: normalizedPhone,
          gender: normalizedGender,
          dob: formattedDob,
          captchaToken,
        })
      );
      if (signupUser.fulfilled.match(resultAction)) {
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
    <>
      <ConfigRefetcher />
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.inputGroup}>
        <label htmlFor="reg-name" className={s.label}>Name</label>
        <input
          id="reg-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={s.input}
          autoComplete="off"
          inputMode="numeric"
          maxLength={10}
          pattern="\d{10}"
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
            <span className={`text-sm ${gender ? "text-black capitalize" : "text-black/40"}`}>
              {gender}
            </span>
            <span className="text-black/40 text-sm">▼</span>
          </div>

          {isGenderOpen && (
            <ul className="absolute top-[110%] left-0 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 overflow-hidden">
              {['Male', 'Female'].map(opt => (
                <li
                  key={opt}
                  onClick={() => { setGender(opt.toLowerCase()); setIsGenderOpen(false); }}
                  className="px-5 py-3 hover:bg-black/5 cursor-pointer text-sm font-light text-black transition-colors"
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={s.inputGroup}>
        <label htmlFor="reg-dob" className={s.label}>Date of Birth</label>
        <input
          id="reg-dob"
          type="date"
          value={dob}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDob(e.target.value)}
          className={s.dateInput}
          required
        />
      </div>

      {isCaptchaEnabled && (
        <div className={s.inputGroup}>
          <p className="text-[10px] text-black/40 mb-2 uppercase tracking-widest font-semibold flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Security Check
          </p>
          <div className={s.turnstileBox}>
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
              onSuccess={(token) => {
                setCaptchaToken(token);
                setError("");
              }}
              onError={() => setError("Captcha verification failed. Please try again.")}
              onExpire={() => setCaptchaToken("")}
            />
          </div>
        </div>
      )}

      <p className={s.error}>{error || "\u00A0"}</p>

      <Button btnType="small" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
    </>
  );
}
