"use client";

import React, { useState } from "react";
import Image from "next/image";
import { shopStyles as s } from "./Shop.styles";
import type { ShirtDesign, ShirtSize } from "./Shop.types";
import { availableSizes, availableKidsSizes, sizeChart } from "./Shop.data";
import Button from "../uiComponents/Button";
import { addShirtsToCart } from "@/lib/atc/addShirtsToCart";
import { useAppSelector } from "@/store/hooks";

interface ShopModalProps {
    isOpen: boolean;
    design: ShirtDesign | null;
    onClose: () => void;
    price: number;
}

export default function ShopModal({ isOpen, design, onClose, price }: ShopModalProps) {
    const playerId = useAppSelector((state) => state.auth.user?.playerId);
    const [selectedSize, setSelectedSize] = useState<ShirtSize | null>(null);
    const [nameToPrint, setNameToPrint] = useState("");
    const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);


    // Reset internal state whenever the modal opens with a new design
    React.useEffect(() => {
        if (isOpen) {
            setSelectedSize(null);
            setNameToPrint("");
            setIsKidsDropdownOpen(false);
        }
    }, [isOpen, design?.id]);

    const resetModalState = () => {
        setSelectedSize(null);
        setNameToPrint("");
        setIsKidsDropdownOpen(false);
    };

    const handleClose = () => {
        resetModalState();
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!design || !selectedSize) return;
        addShirtsToCart(
            {
                name: design.name,
                displayName: nameToPrint,
                size: selectedSize ?? "",
                type: design.type,
            },
            playerId
        );
        handleClose();
    };

    const selectedSizeInfo = sizeChart.find(row => row.size === selectedSize);

    return (
        <>
            <div
                className={`${s.modalOverlay} ${isOpen ? s.modalOverlayOpen : ""}`}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
                <div
                    className={`${s.modalContent} ${isOpen ? s.modalContentOpen : ""}`}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Image preview */}
                    <div className={s.modalImageSection}>
                        {design && (
                            <Image
                                src={design.frontImage}
                                alt={design.name}
                                fill
                                unoptimized
                                className="object-contain p-4"
                            />
                        )}
                    </div>

                    {/* Form */}
                    <div className={s.modalFormSection}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Header with close button */}
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className={s.closeButton}
                                    aria-label="Close"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Size selection */}
                            <div className={s.formGroup}>
                                <label className={s.label}>
                                    Select Size <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className={s.chipsContainer}>
                                    {availableSizes.map(size => (
                                        <div
                                            key={size}
                                            onClick={() => { setSelectedSize(size); setIsKidsDropdownOpen(false); }}
                                            className={`${s.chip} ${selectedSize === size ? s.chipSelected : s.chipUnselected}`}
                                        >
                                            {size}
                                        </div>
                                    ))}

                                    {/* Kid's size dropdown */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsKidsDropdownOpen(v => !v)}
                                            className={`${s.chip} ${availableKidsSizes.includes(selectedSize as ShirtSize) ? s.chipSelected : s.chipUnselected} flex items-center gap-2`}
                                        >
                                            Kid&apos;s size
                                            <svg
                                                className={`w-3 h-3 transition-transform ${isKidsDropdownOpen ? "rotate-180" : ""}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isKidsDropdownOpen && (
                                            <div className={s.kidsDropdown}>
                                                {availableKidsSizes.map(size => (
                                                    <div
                                                        key={size}
                                                        onClick={() => { setSelectedSize(size); setIsKidsDropdownOpen(false); }}
                                                        className={`${s.chip} ${selectedSize === size ? s.chipSelected : s.chipUnselected}`}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Size info */}
                            {selectedSizeInfo ?
                                <p className={s.sizeInfo}>
                                    <span>Chest ({selectedSizeInfo.width}in) - Length ({selectedSizeInfo.length}in)</span>
                                </p>
                                :
                                <p className={s.sizeInfo}>Select a size to proceed!</p>
                            }

                            {/* Name to print */}
                            <div className={s.formGroup}>
                                <label className={s.label} htmlFor="printName">
                                    Name to Print on the back
                                </label>
                                <input
                                    type="text"
                                    id="printName"
                                    autoComplete="off"
                                    value={nameToPrint}
                                    onChange={e => setNameToPrint(e.target.value)}
                                    maxLength={20}
                                    className={s.input}
                                    placeholder="e.g. TEST (Leave blank for none)"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!selectedSize}
                                // className="w-full py-2.5 mt-2 bg-[#B45309] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#924206] active:bg-[#783605] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                className="w-full py-2.5 mt-2 border border-[#B45309] text-[#B45309] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#ffd4b3] active:bg-[#ffd4b3] transition-colors disabled:opacity-40"
                            >
                                Add to Cart — ₹{price}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
