"use client";

import React from "react";
import Image from "next/image";
import { shopStyles as s } from "../Shop.styles";

interface SizeChartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
    // Handle escape key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`${s.modalOverlay} ${isOpen ? s.modalOverlayOpen : ""}`}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
            onClick={onClose}
        >
            <div
                className={`${s.modalContent} ${isOpen ? s.modalContentOpen : ""}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Section 1: Image (Reusing ShopModal's image section) */}
                <div className={s.modalImageSection} style={{ minHeight: '300px' }}>
                    <Image
                        src="/shirts/one-front.png" // Placeholder
                        alt="Size Chart"
                        fill
                        unoptimized
                        className="object-contain p-8"
                    />
                </div>

                {/* Section 2: Info & Close (Reusing ShopModal's form section) */}
                <div className={`${s.modalFormSection} !gap-4 !py-5 !overflow-visible`}>
                    <div className="flex justify-center items-start text-center">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Size Chart</h2>
                            <p className="text-sm text-black/50 mt-1">Habya 2026 Official Gear</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className={s.closeButton}
                            aria-label="Close"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 justify-center py-2">
                        <div className="p-3 bg-gray-50 rounded-2xl border border-black/5">
                            <p className="text-[13px] leading-relaxed text-black/70">
                                • Compare these with your best-fitting shirt at home.<br />
                                • If between sizes, we recommend going one size up.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-fit px-8 py-2 mx-auto mt-auto border border-[#B45309] text-[#B45309] font-bold text-[13px] rounded-xl hover:bg-[#ffd4b3] active:scale-[0.98] transition-all"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
}
