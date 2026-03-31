"use client";

import { useState, useEffect } from "react";
import { heroStyles } from "./Hero.styles";
import type { HeroProps } from "./Hero.types";
import { WaveParticles } from "@/components/home/WaveParticles";
import { AuthActions } from "@/components/home/AuthActions";

export default function Hero({ headline, description }: HeroProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingCompleted, setIsTypingCompleted] = useState(false);

    useEffect(() => {
        let i = 0;
        setDisplayedText(""); // Reset when headline changes
        setIsTypingCompleted(false);
        const typingInterval = setInterval(() => {
            if (i < headline.length) {
                setDisplayedText(headline.slice(0, i + 1));
                i++;
            } else {
                setIsTypingCompleted(true);
                clearInterval(typingInterval);
            }
        }, 90); // ~1.3x speed increase

        return () => clearInterval(typingInterval);
    }, [headline]);

    return (
        <section className={heroStyles.wrapper}>
            <WaveParticles isVisible={isTypingCompleted} />

            <div className={`relative z-10 ${heroStyles.content}`}>
                <img 
                    src="/illustration-1.png" 
                    alt="Habya Illustration"
                    className={`${heroStyles.illustrationTop} ${isTypingCompleted ? heroStyles.illustrationVisible : heroStyles.illustrationHidden}`}
                />
                <h1 className={heroStyles.headline}>
                    {displayedText}
                    {!isTypingCompleted && <span className={heroStyles.cursor} />}
                </h1>
                {description && (
                    <p className={`${heroStyles.description} ${isTypingCompleted ? heroStyles.descriptionVisible : heroStyles.descriptionHidden}`}>
                        {description}
                    </p>
                )}
                <AuthActions isVisible={isTypingCompleted} />
            </div>
        </section>
    );
}
