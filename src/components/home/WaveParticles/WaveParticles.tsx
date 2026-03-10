"use client";

import { useEffect, useRef } from "react";
import { waveParticlesStyles } from "./WaveParticles.styles";
import type { WaveParticlesProps } from "./WaveParticles.types";

export default function WaveParticles({ isVisible }: WaveParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const speedRef = useRef(0.015);
    const isDecayingRef = useRef(false);

    useEffect(() => {
        if (isVisible) {
            // Wait 2 seconds before freezing the animation
            const timer = setTimeout(() => {
                isDecayingRef.current = true;
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            render(); // Force render on resize
        };
        window.addEventListener("resize", handleResize);

        let time = 100; // Start at an offset so waves look dynamic immediately
        const numLines = 4; // Exactly four lines

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Apply gradient
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, "#0066FF");
            gradient.addColorStop(0.33, "#00FF66");
            gradient.addColorStop(0.66, "#FFEA00");
            gradient.addColorStop(1, "#FF0040");
            ctx.fillStyle = gradient;

            if (isDecayingRef.current) {
                speedRef.current *= 0.95; // Smoothly stop
                if (speedRef.current < 0.0001) speedRef.current = 0;
            }
            time += speedRef.current;

            const isMobile = width < 768;

            // Adjust the wave constraints securely so they are small and tight on mobile
            // Maximum vertically allowed amplitude
            const waveHeight = isMobile ? Math.min(height * 0.1, 50) : Math.min(height * 0.2, 100);

            // Increase frequency for tighter, more frequent peaks
            const frequency = isMobile ? 0.015 : 0.008;

            // Generate dots - significantly reduced density (by ~60%)
            const dotsPerLine = isMobile ? Math.floor(width / 7.5) : Math.floor(width / 10);

            ctx.beginPath();
            for (let i = 0; i < numLines; i++) {
                // Offset the phase of each line smoothly so they are all distinct
                // By stepping PI / 2, we generate 4 distinct waveforms that criss-cross symmetrically
                const lineOffset = i * (Math.PI / 2);

                for (let d = 0; d < dotsPerLine; d++) {
                    const x = (d / dotsPerLine) * width;

                    // Simple tight math ensuring no massive unpredictable vertical spikes
                    const y = height / 2
                        + Math.sin(x * frequency + time + lineOffset) * waveHeight
                        + Math.cos(x * (frequency * 1.5) - time * 0.8) * (waveHeight * 0.4);

                    ctx.moveTo(x, y);
                    ctx.roundRect(x, y, 6, 4, 3);
                }
            }
            ctx.fill();

            if (speedRef.current > 0) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`${waveParticlesStyles.canvas} ${isVisible ? waveParticlesStyles.visible : waveParticlesStyles.hidden
                }`}
        />
    );
}
