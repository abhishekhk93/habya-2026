"use client";
import React, { useRef, useState, useEffect } from "react";
import type { PartnerIdModalProps } from "./EventRegistration.types";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";


export default function PartnerIdModal({ eventName, eventId, onClose, onConfirm }: PartnerIdModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on open
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Lock body scroll while modal is open
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

    // Auto-advance to next input
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
    // Focus the last filled or next empty
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
      const categoryCode = String(eventId).padStart(3, '0');
      const res = await fetch(`/api/player/search?playerId=${partnerId}&categoryCode=${categoryCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok || !data.isEligible) {
        setError(data.message || "Invalid partner ID.");
        return;
      }

      onConfirm(partnerId);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={s.backdrop}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Enter partner ID for ${eventName}`}
        className={s.modal}
      >
        <div className={s.modalContent}>

          {/* Header */}
          <h2 className="text-base font-medium text-black/90 text-center leading-snug">
            Enter the profile ID of your partner for{" "}
            <span className="font-semibold">{eventName}</span>
          </h2>

          {/* 4 digit squares */}
          <div className="flex justify-center gap-3">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
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

          {/* Error */}
          {error && (
            <p className={s.error}>{error}</p>
          )}

          {/* Buttons */}
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
