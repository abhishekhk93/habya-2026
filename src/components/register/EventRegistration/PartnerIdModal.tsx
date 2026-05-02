"use client";
import React, { useRef, useState, useEffect } from "react";
import type { PartnerIdModalProps } from "./EventRegistration.types";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";
import { fetchApi } from "@/lib/fetchApi";


export default function PartnerIdModal({ eventName, eventId, categoryCode, onClose, onConfirm }: PartnerIdModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1); // only last numeric char
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(null);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    for (let i = 0; i < 4; i++) next[i] = pasted[i] ?? "";
    setDigits(next);
    const focusIdx = Math.min(pasted.length, 3);
    inputRefs.current[focusIdx]?.focus();
  };

  const partnerId = digits.join("");
  const isComplete = partnerId.length === 4;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        playerId: partnerId,
        categoryCode,
      });

      const data = await fetchApi<any>(`/api/player/search?${searchParams.toString()}`, {
        method: "GET",
        timeout: 10000,
      });

      if (!data.isEligible) {
        setError(data.message || "Invalid partner ID.");
        return;
      }

      onConfirm({
        partnerId,
        partnerName: data.playerDetails?.fullName || partnerId,
      });
      onClose();
    } catch (err: any) {
      if (err.message === "REQUEST_TIMEOUT") {
        setError("Partner validation timed out. Please try again.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      { }
      <div
        className={s.backdrop}
        aria-hidden="true"
      />

      { }
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Enter partner ID for ${eventName}`}
        className={s.modal}
      >
        <div className={s.modalContent}>

          { }
          <h2 className="text-base font-medium text-black/90 text-center leading-snug">
            Enter the profile ID of your partner for{" "}
            <span className="font-semibold">{eventName}</span>
          </h2>

          { }
          <div className="flex justify-center gap-3">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={`${s.digitInput} ${digit ? s.digitInputFilled : s.digitInputEmpty}`}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          { }
          <p className={`${s.errorPlaceholder} ${error ? s.error : "text-transparent"}`}>
            {error || "\u00A0"}
          </p>

          { }
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={s.cancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className={s.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
