"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { shopStyles } from "./Shop.styles";
import type { ShirtDesign, ShirtSize, ShirtStyle, ShopProps, SizeChartItem } from "./Shop.types";
import PageTitle from "@/ui/PageTitle";
import PageSubtitle from "@/ui/PageSubtitle";
import Button from "@/ui/Button";

const shirtDesigns: ShirtDesign[] = [
    {
        id: "d1",
        name: "Collared Half sleeves",
        frontImage: "/shirts/one-front.png",
        backImage: "/shirts/one-back.png",
        price: 599,
    },
    {
        id: "d2",
        name: "Roundneck Half Sleeves",
        frontImage: "/shirts/two-front.png",
        backImage: "/shirts/two-back.png",
        price: 549,
    },
    {
        id: "d3",
        name: "Roundneck Sleeveless",
        frontImage: "/shirts/three-front.png",
        backImage: "/shirts/three-back.png",
        price: 499,
    }
];

const availableSizes: ShirtSize[] = ['S', 'M', 'L', 'XL', 'XXL'];
const availableKidsSizes: ShirtSize[] = ['XS', '2XS', '3XS', '4XS', '5XS', '6XS', '7XS', '8XS', '9XS', '10XS'];
const availableStyles: ShirtStyle[] = ['Roundneck Sleeveless', 'Roundneck Half Sleeves', 'Collared Half sleeves'];
const sizeChart: SizeChartItem[] =[
    { size: "10XS", width: "18", length: "17", sleeve: "6", shoulder: "11.5" },
    { size: "9XS", width: "20", length: "18", sleeve: "6.25", shoulder: "12" },
    { size: "8XS", width: "22", length: "19", sleeve: "6.5", shoulder: "12.5" },
    { size: "7XS", width: "24", length: "20", sleeve: "6.75", shoulder: "13" },
    { size: "6XS", width: "26", length: "21", sleeve: "7", shoulder: "13.5" },
    { size: "5XS", width: "28", length: "22", sleeve: "7.25", shoulder: "14" },
    { size: "4XS", width: "30", length: "23", sleeve: "7.5", shoulder: "14.5" },
    { size: "3XS", width: "32", length: "24", sleeve: "7.75", shoulder: "15" },
    { size: "2XS", width: "34", length: "25", sleeve: "8", shoulder: "15.5" },
    { size: "XS", width: "36", length: "26", sleeve: "8.25", shoulder: "16" },
    { size: "S", width: "38", length: "27", sleeve: "8.5", shoulder: "16.5" },
    { size: "M", width: "40", length: "28", sleeve: "8.75", shoulder: "17" },
    { size: "L", width: "42", length: "29", sleeve: "9", shoulder: "18" },
    { size: "XL", width: "44", length: "30", sleeve: "9.25", shoulder: "18.5"},
    { size: "XXL", width: "46", length: "31", sleeve: "9.5", shoulder: "19" },
  ];

export default function Shop({ className }: ShopProps) {
    const [selectedDesign, setSelectedDesign] = useState<ShirtDesign | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Per-card carousel index: 0 = front, 1 = back
    const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
    const [showBadge, setShowBadge] = useState(false);
    const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);
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

    // Modal state
    const [nameToPrint, setNameToPrint] = useState("");
    const [selectedSize, setSelectedSize] = useState<ShirtSize | null>(null);

    const handleOpenModal = (design: ShirtDesign) => {
        setSelectedDesign(design);
        // Reset defaults
        setNameToPrint("");
        setSelectedSize(null);
        setIsKidsDropdownOpen(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsKidsDropdownOpen(false);
        setTimeout(() => setSelectedDesign(null), 300); // Wait for transition
    };

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDesign) return;
        console.log(e);
        setShowBadge(true);
        setTimeout(() => setShowBadge(false), 2000);
        handleCloseModal();
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
        <div className={`${shopStyles.container} ${className || ""}`}>
            {/* Main Shop Details */}
            <div className={shopStyles.mainSection}>
                <PageTitle type="light">Shop Shirts</PageTitle>
                <PageSubtitle type="light">
                    Customize your Habya 2026 gear.
                </PageSubtitle>

                <div className={shopStyles.gridContainer}>
                    {shirtDesigns.map(design => (
                        <div key={design.id} className={shopStyles.shirtCard}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={e => handleTouchEnd(e, design.id, 2)}
                        >
                            {/* Carousel image track */}
                            <div className={shopStyles.imageFlipper} style={{ overflow: "hidden" }}>
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
                                                className={shopStyles.shirtImage}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Prev arrow */}
                                {getIndex(design.id) > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setIndex(design.id, getIndex(design.id) - 1)}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-black/60 hover:text-black transition-colors z-10"
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
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-black/60 hover:text-black transition-colors z-10"
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

                                {/* Front / Back label */}
                                {/* <span className="absolute top-2 left-2 text-[10px] font-medium bg-white/80 backdrop-blur-sm text-black/60 px-2 py-0.5 rounded-full z-10">
                                    {getIndex(design.id) === 0 ? "Front" : "Back"}
                                </span> */}
                            </div>
                            <div className={shopStyles.cardContent}>
                                <h3 className={shopStyles.shirtName}>{design.name} <span className={shopStyles.shirtPrice}>&nbsp;&nbsp;-&nbsp;&nbsp;₹{design.price}</span></h3>
                                <Button btnType="small" onClick={() => handleOpenModal(design)}>
                                    Customize & Add
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customization Modal Overlay */}
            <div 
                className={`${shopStyles.modalOverlay} ${isModalOpen ? shopStyles.modalOverlayOpen : ''}`}
                style={{ pointerEvents: isModalOpen ? "auto" : "none" }}
                onClick={handleCloseModal}
            >
                <div 
                    className={`${shopStyles.modalContent} ${isModalOpen ? shopStyles.modalContentOpen : ''}`}
                    onClick={e => e.stopPropagation()}
                >
                    
                    {/* Visual Preview Half */}
                    <div className={shopStyles.modalImageSection}>
                        {selectedDesign && (
                            <Image
                                src={selectedDesign.frontImage}
                                alt={selectedDesign.name}
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        )}
                    </div>

                    {/* Form Half */}
                    <div className={shopStyles.modalFormSection}>
                        <form onSubmit={handleAddToCart} className="flex flex-col gap-4">
                            {/* Modal header with close button */}
                            <div className="flex justify-between items-center">
                                <button 
                                    type="button"
                                    onClick={handleCloseModal}
                                    className={shopStyles.closeButton}
                                    aria-label="Close"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className={shopStyles.formGroup}>
                                <label className={shopStyles.label}>Select Size <span style={{color: 'red'}}>*</span></label>
                                <div className={shopStyles.chipsContainer}>
                                    {availableSizes.map(size => (
                                        <div 
                                            key={size}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setIsKidsDropdownOpen(false);
                                            }}
                                            className={`${shopStyles.chip} ${selectedSize === size ? shopStyles.chipSelected : shopStyles.chipUnselected}`}
                                        >
                                            {size}
                                        </div>
                                    ))}

                                    {/* Kid's Size Dropdown */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsKidsDropdownOpen(!isKidsDropdownOpen)}
                                            className={`${shopStyles.chip} ${availableKidsSizes.includes(selectedSize as ShirtSize) ? shopStyles.chipSelected : shopStyles.chipUnselected} flex items-center gap-2`}
                                        >
                                            Kid's size
                                            <svg 
                                                className={`w-3 h-3 transition-transform ${isKidsDropdownOpen ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isKidsDropdownOpen && (
                                            <div className={shopStyles.kidsDropdown}>
                                                {availableKidsSizes.map(size => (
                                                    <div 
                                                        key={size}
                                                        onClick={() => {
                                                            setSelectedSize(size);
                                                            setIsKidsDropdownOpen(false);
                                                        }}
                                                        className={`${shopStyles.chip} ${selectedSize === size ? shopStyles.chipSelected : shopStyles.chipUnselected}`}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className={shopStyles.sizeInfo}>
                                {sizeChart.filter(size => size.size === selectedSize).map(size => (
                                    <span key={size.size}>
                                        Chest({size.width}in) - Length({size.length}in)
                                    </span>
                                ))}
                            </p>

                            {/* Printed Name */}
                            <div className={shopStyles.formGroup}>
                                <label className={shopStyles.label} htmlFor="printName">
                                    Name to Print on the back
                                </label>
                                <input
                                    type="text"
                                    id="printName"
                                    value={nameToPrint}
                                    onChange={(e) => setNameToPrint(e.target.value)}
                                    maxLength={20}
                                    className={shopStyles.input}
                                    placeholder="e.g. TEST (Leave blank for none)"
                                />
                            </div>

                            {/* Submit */}
                            <Button type="submit" btnType="small" disabled={!selectedSize}>
                                Add to Cart — ₹{selectedDesign?.price}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>

            {showBadge && (
                <div className={`${shopStyles.badge} ${showBadge ? shopStyles.badgeOpen : ''}`}>
                {/* Tick icon */}
                    <div className={shopStyles.tickIcon}>
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
