import React from "react";
import type { StepItemProps } from "./Checkout.types";

export function StepItem({ stepNumber, currentStep, hasError, title }: StepItemProps) {
  const isCompleted = currentStep > stepNumber;
  const isCurrent = currentStep === stepNumber && !hasError;
  const isFailed = currentStep === stepNumber && hasError;

  let icon = null;
  let color = "#9CA3AF"; // gray-400

  if (isCompleted) {
    color = "#10B981"; // emerald-500
    icon = (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  } else if (isCurrent) {
    color = "#3B82F6"; // blue-500
    icon = (
      <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "currentColor", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
    );
  } else if (isFailed) {
    color = "#EF4444"; // red-500
    icon = (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else {
    // pending
    icon = (
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "currentColor" }} />
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", color: isCurrent || isCompleted || isFailed ? "#111827" : "#9CA3AF", transition: "color 0.3s ease" }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `2px solid ${color}`, color: color, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}>
        {icon}
      </div>
      <span style={{ fontSize: "14px", fontWeight: isCurrent ? 500 : 400 }}>{title}</span>
    </div>
  );
}
