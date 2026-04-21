"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { closedStateStyles as s } from "./ClosedState.styles";
import Button from "../../uiComponents/Button";

interface ClosedStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    buttonText?: string;
    onButtonClick?: () => void;
    theme?: "indigo" | "brown" | "emerald" | "default";
}

export const ClosedState: React.FC<ClosedStateProps> = ({
    title,
    description,
    icon,
    buttonText = "Return to Home",
    onButtonClick,
    theme = "default",
}) => {
    const router = useRouter();

    const handleDefaultClick = () => {
        router.push("/");
    };

    const themeStyles = s.theme[theme];

    return (
        <div className={s.wrapper}>
            <div className={s.card}>
                <div className={`${s.iconContainer} ${themeStyles.iconContainer}`}>
                    {icon || (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    )}
                </div>

                <h2 className={`${s.title} ${themeStyles.title}`}>{title}</h2>
                <p className={s.description}>{description}</p>

                <Button
                    onClick={onButtonClick || handleDefaultClick}
                    btnType="small"
                    style={{ marginTop: "1rem", width: "fit-content", paddingLeft: "2rem", paddingRight: "2rem" }}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

