"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginStyles } from "./Login.styles";
import type { LoginProps } from "./Login.types";
import Button from "@/ui/Button";
import PageTitle from "@/ui/PageTitle";
import PageSubtitle from "@/ui/PageSubtitle";

export default function Login({ className }: LoginProps) {
    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={`${loginStyles.container} ${className || ""}`}>
            {/* Image Section (Background on mobile, 50% width on Desktop) */}
            <div className={loginStyles.imageSection}>
                <div className={loginStyles.imageWrapper}>
                    <Image
                        src="/player.png"
                        alt="Habya 2026 Player"
                        fill
                        priority
                        className={loginStyles.image}
                    />
                    <div className={loginStyles.mobileOverlay} />
                </div>
            </div>

            {/* Form Section */}
            <div className={loginStyles.formSection}>
                <div className={loginStyles.card}>
                    <PageTitle>Welcome Back</PageTitle>
                    <PageSubtitle>
                        Log in to access your account and events!
                    </PageSubtitle>

                    <form onSubmit={handleSubmit} className={loginStyles.form}>
                        <div className={loginStyles.inputGroup}>
                            <svg 
                                className={loginStyles.inputIcon} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className={loginStyles.input}
                                placeholder="Enter your Mobile Number"
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit mobile number"
                                required
                            />
                        </div>

                        <div className={loginStyles.inputGroup}>
                            <div className="relative w-full">
                                <svg 
                                    className={loginStyles.inputIcon} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={loginStyles.input}
                                    placeholder="Enter your Password"
                                    required
                                />
                            </div>
                        </div>

                        <Button btnType="primary" type="submit">
                            Log In
                        </Button>
                    </form>

                    <p className={loginStyles.signupText}>
                        Don't have an account? &nbsp;
                        <Link href="/signup" className={loginStyles.signupLink}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
