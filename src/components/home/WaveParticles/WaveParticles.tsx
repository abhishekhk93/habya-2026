"use client";

import { useEffect, useRef } from "react";
import { waveParticlesStyles } from "./WaveParticles.styles";
import type { WaveParticlesProps } from "./WaveParticles.types";

export default function WaveParticles({ isVisible }: WaveParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const speedRef = useRef(0.01);
    const isDecayingRef = useRef(false);

    useEffect(() => {
        if (isVisible) {
            // Wait 2 seconds before gradually slowing down the animation
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
            render(); // Force render on resize in case animation is stopped
        };
        window.addEventListener("resize", handleResize);

        // Start time at a higher value so the wave is deeply twisted from the beginning
        // and coasts to a stop in a non-parallel, highly interwoven state.
        let time = 50;
        const numWaves = 15;
        const dotsPerWave = Math.floor(width / 15);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, "#0066FF");
            gradient.addColorStop(0.33, "#00FF66");
            gradient.addColorStop(0.66, "#FFEA00");
            gradient.addColorStop(1, "#FF0040");
            ctx.fillStyle = gradient;

            if (isDecayingRef.current) {
                speedRef.current *= 0.98; // Gradually reduce speed
                if (speedRef.current < 0.0001) speedRef.current = 0;
            }
            time += speedRef.current;

            ctx.beginPath();
            for (let w = 0; w < numWaves; w++) {
                for (let d = 0; d < dotsPerWave; d++) {
                    const x = (d / dotsPerWave) * width;
                    const wavePhase = w * 0.15;

                    const twist = w * 0.03;
                    const yOffset =
                        Math.sin(x * 0.002 + time * (1 + twist) + wavePhase) * (height * 0.16) +
                        Math.sin(x * (0.005 + twist * 0.001) - time * 0.5 + wavePhase) * (height * 0.08) +
                        Math.cos(x * 0.003 + time * 0.8) * (height * 0.04);

                    const y = height / 2 + yOffset;

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
