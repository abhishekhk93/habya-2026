"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUpStyles } from "./SignUp.styles";
import type { SignUpProps } from "./SignUp.types";
import Button from "@/ui/Button";
import PageTitle from "@/ui/PageTitle";
import PageSubtitle from "@/ui/PageSubtitle";

export default function SignUp({ className }: SignUpProps) {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        dob: "",
        gender: "",
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
        <div className={`${signUpStyles.container} ${className || ""}`}>
            {/* Image Section (Background on mobile, 50% width on Desktop) */}
            <div className={signUpStyles.imageSection}>
                <div className={signUpStyles.imageWrapper}>
                    <Image
                        src="/player.png"
                        alt="Habya 2026 Player"
                        fill
                        priority
                        className={signUpStyles.image}
                    />
                    <div className={signUpStyles.mobileOverlay} />
                </div>
            </div>

            {/* Form Section */}
            <div className={signUpStyles.formSection}>
                <div className={signUpStyles.card}>
                    <PageTitle>Create Account</PageTitle>
                    <PageSubtitle>
                        Sign Up to register for events!
                    </PageSubtitle>

                    <form onSubmit={handleSubmit} className={signUpStyles.form}>
                        <div className={signUpStyles.inputGroup}>
                            <svg 
                                className={signUpStyles.inputIcon} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={signUpStyles.input}
                                placeholder="Enter your Full Name"
                                required
                            />
                        </div>

                        <div className={signUpStyles.inputGroup}>
                            <svg 
                                className={signUpStyles.inputIcon} 
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
                                className={signUpStyles.input}
                                placeholder="Enter your Mobile Number"
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit mobile number"
                                required
                            />
                        </div>

                        <div className={signUpStyles.inputGroup}>
                            <svg 
                                className={signUpStyles.inputIcon} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className={signUpStyles.input}
                                placeholder="Enter your Date of Birth"
                                required
                            />
                        </div>

                        <div className={signUpStyles.inputGroup}>
                            <div className={signUpStyles.radioGroup}>
                                <label className={signUpStyles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                        className={signUpStyles.radioInput}
                                        required
                                    />
                                    Male
                                </label>
                                <label className={signUpStyles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                        className={signUpStyles.radioInput}
                                        required
                                    />
                                    Female
                                </label>
                            </div>
                        </div>

                        <Button btnType="primary" type="submit">
                            Sign Up
                        </Button>
                    </form>

                    <p className={signUpStyles.loginText}>
                        Already have an account? &nbsp;
                        <Link href="/login" className={signUpStyles.loginLink}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
