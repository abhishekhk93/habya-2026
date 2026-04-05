"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { shopStyles as s } from "./Shop.styles";
import type { ShirtDesign, ShirtSize, ShopProps } from "./Shop.types";
import Button from "../uiComponents/Button";
import { shirtDesigns } from "./Shop.data";
import ShopModal from "./ShopModal";

export default function Shop({ className }: ShopProps) {
    const [selectedDesign, setSelectedDesign] = useState<ShirtDesign | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBadge, setShowBadge] = useState(false);
    // Per-card carousel index: 0 = front, 1 = back
    const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
    
    const touchStartX = React.useRef<number>(0);

    // Lock background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isModalOpen]);

    const handleOpenModal = (design: ShirtDesign) => {
        setSelectedDesign(design);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setShowBadge(false), 2000);
        setTimeout(() => setSelectedDesign(null), 200); // Wait for transition
    };

    // Carousel helpers
    const getIndex = (id: string) => carouselIndex[id] ?? 0;
    const setIndex = (id: string, idx: number) =>
        setCarouselIndex(prev => ({ ...prev, [id]: idx }));

    // Touch swipe to navigate carousel
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent, id: string, total: number) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (delta > 40) setIndex(id, Math.min(getIndex(id) + 1, total - 1));
        else if (delta < -40) setIndex(id, Math.max(getIndex(id) - 1, 0));
    };

    return (
        <div className={s.wrapper}>
            {/* Main Shop Details */}
            <div className={s.card}>
                <h1 className={s.header}>Shop Shirts</h1>
                <p className={s.subtitle}>
                    Customize your Habya 2026 gear.
                </p>

                <div className={s.gridContainer}>
                    {shirtDesigns.map(design => (
                        <div key={design.id} className={s.shirtCard}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={e => handleTouchEnd(e, design.id, 2)}
                        >
                            {/* Carousel image track */}
                            <div className={s.imageFlipper} style={{ overflow: "hidden" }}>
                                <div style={{
                                    display: "flex",
                                    width: "200%",
                                    height: "100%",
                                    transform: `translateX(-${getIndex(design.id) * 50}%)`,
                                    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                                }}>
                                    {[design.frontImage, design.backImage].map((src, i) => (
                                        <div key={i} style={{ position: "relative", width: "50%", flexShrink: 0, height: "100%" }}>
                                            <Image
                                                src={src}
                                                alt={i === 0 ? `${design.name} Front` : `${design.name} Back`}
                                                fill
                                                unoptimized
                                                className={s.shirtImage}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Prev arrow */}
                                {getIndex(design.id) > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setIndex(design.id, getIndex(design.id) - 1)}
                                        className={`${s.arrowButton} left-2`}
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                )}

                                {/* Next arrow */}
                                {getIndex(design.id) < 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setIndex(design.id, getIndex(design.id) + 1)}
                                        className={`${s.arrowButton} right-2`}
                                        aria-label="Next image"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}

                                {/* Dot indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {[0, 1].map(i => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setIndex(design.id, i)}
                                            className="transition-all duration-300"
                                            style={{
                                                width: getIndex(design.id) === i ? "16px" : "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: getIndex(design.id) === i ? "#000" : "rgba(0,0,0,0.3)",
                                            }}
                                            aria-label={i === 0 ? "Front" : "Back"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={s.cardContent}>
                                <h3 className={s.shirtName}>{design.name} <span className={s.shirtPrice}>&nbsp;&nbsp;-&nbsp;&nbsp;₹{design.price}</span></h3>
                                <Button btnType="small" onClick={() => handleOpenModal(design)}>
                                    Customize & Add
                                </Button>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <ShopModal
                    isOpen={isModalOpen}
                    design={selectedDesign}
                    onClose={handleCloseModal}
                    setShowBadge={setShowBadge}
                />
            )}

            {showBadge && (
                <div className={`${s.badge} ${showBadge ? s.badgeOpen : ''}`}>
                {/* Tick icon */}
                    <div className={s.tickIcon}>
                        ✓
                    </div>

                    {/* Message */}
                    <span className="text-sm font-medium">
                        Added to cart!
                    </span>
                </div>
            )}

        </div>
    );
}
