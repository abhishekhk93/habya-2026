"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { shopStyles as s } from "./Shop.styles";
import type { ShirtDesign, ShopProps } from "./Shop.types";
import Button from "../uiComponents/Button";
import { shirtDesigns } from "./Shop.data";
import ShopModal from "./ShopModal";
import SizeChartModal from "./SizeChartModal/SizeChartModal";
import { useAppSelector } from "@/store/hooks";
import { getCart } from "@/lib/atc/storage";
import { ClosedState } from "../common/ClosedState";
import { Loader } from "../common/Loader";
import { getConfigValue } from "@/lib/getConfigValue";
import { ConfigData } from "@/app/_disabled_api/config/types";

export default function Shop({ className }: ShopProps) {
    const [selectedDesign, setSelectedDesign] = useState<ShirtDesign | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    // Per-card carousel index: 0 = front, 1 = back
    const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});

    const playerId = useAppSelector((state) => state.auth.user?.playerId);
    const configData = useAppSelector((state) => state.config.data);
    const isShirtOrdersOpen = configData?.is_shirt_orders_open;
    const [cartCounts, setCartCounts] = useState<Record<string, number>>({});
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (!playerId) {
            setCartCounts({});
            return;
        }
        const cart = getCart(playerId);
        const counts: Record<string, number> = {};
        for (const item of cart.items) {
            if (item.itemType === "TSHIRT") {
                const attrs = item.itemAttributes as any;
                if (attrs.type) {
                    counts[attrs.type] = (counts[attrs.type] || 0) + 1;
                }
            }
        }
        setCartCounts(counts);
    }, [playerId, isModalOpen]);

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

    if (isShirtOrdersOpen === undefined) {
        return (
            <div className={s.wrapper} style={{ justifyContent: "center" }}>
                <div className={s.card} style={{ maxWidth: "500px" }}>
                    <Loader message="Folding the tees..." />
                </div>
            </div>
        );
    }

    if (!isShirtOrdersOpen) {
        return (
            <div className={s.wrapper}>
                <ClosedState
                    title="Shirt Orders are Closed"
                    description="We are not currently taking new shirt orders for Habya 2026. Please check back later."
                    theme="brown"
                />
            </div>
        );
    }

    return (

        <div className={s.wrapper}>
            {/* Main Shop Details */}
            <div className={s.card}>
                <h1 className={s.header}>Shop Shirts</h1>
                <p className={s.subtitle}>
                    Customize your Habya 2026 gear.
                </p>

                <div className="flex items-center justify-center gap-1.5 mb-8 text-[11px] md:text-[12px] text-black/40 bg-black/[0.02] py-1 px-3 rounded-full w-fit mx-auto border border-black/[0.03]">
                    <svg className="w-3.5 h-3.5 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Shirts will proudly feature sponsor branding.</span>
                </div>

                <button 
                    onClick={() => setIsSizeChartOpen(true)}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-[#B45309] hover:text-[#924206] transition-colors mb-6 mx-auto group bg-white border border-[#B45309]/20 px-4 py-1.5 rounded-full hover:border-[#B45309]/50 shadow-sm"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View Size Chart
                </button>

                <div className={s.gridContainer}>
                    {shirtDesigns.map((design, index) => (
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
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={index === 0 && i === 0}
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
                            </div>

                            {/* Dot indicators */}
                            <div className="flex justify-center gap-1.5 mt-3 -mb-1 z-10 w-full">
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

                            <div className={s.cardContent}>
                                {(() => {
                                    const price = Number(getConfigValue(configData, design.configKey as keyof ConfigData, String(design.price))) || design.price;
                                    return (
                                        <h3 className={s.shirtName}>
                                            {design.name}
                                            <span className={s.shirtPrice}>&nbsp;&nbsp;-&nbsp;&nbsp;₹{price}</span>
                                        </h3>
                                    );
                                })()}
                                {cartCounts[design.type] ? (
                                    <p className="text-[13px] text-center text-green-600 my-1.5 font-medium tracking-tight flex items-center justify-center">
                                        You added {cartCounts[design.type]} item{cartCounts[design.type] > 1 ? 's' : ''} to the cart
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] ml-1">
                                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </p>
                                ) : (
                                    <p className="text-[13px] text-center text-black/40 my-1.5 font-light tracking-tight">
                                        Customize your fit today!
                                    </p>
                                )}
                                <button
                                    type="button"
                                    className="w-full py-2.5 mt-1 bg-white border border-[#B45309] text-[#B45309] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#ffd4b3] active:bg-[#ffd4b3] transition-colors"
                                    onClick={() => handleOpenModal(design)}
                                >
                                    Customize & Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', width: '100%', alignItems: 'center' }}>
                    <Button 
                        style={{ width: '100%', maxWidth: '240px' }} 
                        btnType='small'
                        onClick={() => {
                            setIsNavigating(true);
                            router.push("/cart");
                        }}
                        isLoading={isNavigating}
                    >
                        Go to Cart
                    </Button>
                </div>
            </div>


            {isModalOpen && (
                <ShopModal
                    isOpen={isModalOpen}
                    design={selectedDesign}
                    onClose={handleCloseModal}
                    price={selectedDesign ? (Number(getConfigValue(configData, selectedDesign.configKey as keyof ConfigData, String(selectedDesign.price))) || selectedDesign.price) : 0}
                />
            )}

            <SizeChartModal 
                isOpen={isSizeChartOpen} 
                onClose={() => setIsSizeChartOpen(false)} 
            />

        </div>
    );
}
