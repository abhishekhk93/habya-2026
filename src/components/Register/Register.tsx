"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { registerStyles } from "./Register.styles";
import type { RegisterProps, EventType } from "./Register.types";
import Button from "@/ui/Button";
import PageTitle from "@/ui/PageTitle";
import PageSubtitle from "@/ui/PageSubtitle";

const mockEvents: EventType[] = [
    {
        id: 21,
        name: "Mixed Age Mixed Doubles",
        type: "mixed_doubles",
        allowedGenders: ["male", "female"],
        partnerRule: {
            requireOneFemale: true,
            requireOneAboveAge: "atLeast40OnDay1",
        },
        tooltipContent: "Atleast one female and one above 40",
        price: 1000,
        entryLimit: 30, // Mock entry limit
    },
    {
        id: 22,
        name: "Men's Singles (Open)",
        type: "singles",
        allowedGenders: ["male"],
        price: 500,
        entryLimit: 64,
    },
    {
        id: 23,
        name: "Women's Doubles (U-30)",
        type: "doubles",
        allowedGenders: ["female"],
        price: 800,
        entryLimit: 24,
    },
    {
        id: 27,
        name: "Mixed Age Mixed Doubles",
        type: "mixed_doubles",
        allowedGenders: ["male", "female"],
        partnerRule: {
            requireOneFemale: true,
            requireOneAboveAge: "atLeast40OnDay1",
        },
        tooltipContent: "Atleast one female and one above 40",
        price: 1000,
        entryLimit: 30, // Mock entry limit
    },
    {
        id: 28,
        name: "Men's Singles (Open)",
        type: "singles",
        allowedGenders: ["male"],
        price: 500,
        entryLimit: 64,
    },
    {
        id: 29,
        name: "Women's Doubles (U-30)",
        type: "doubles",
        allowedGenders: ["female"],
        price: 800,
        entryLimit: 24,
    }
];

export default function Register({ className }: RegisterProps) {
    const [events, setEvents] = useState<EventType[]>([]);
    const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch events
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                // In a real scenario: const response = await fetch('/api/events'); const data = await response.json();
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulated delay
                setEvents(mockEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const toggleEventRegistration = (eventId: number) => {
        setRegisteredEvents(prev => {
            const newSet = new Set(prev);
            if (newSet.has(eventId)) {
                newSet.delete(eventId);
            } else {
                newSet.add(eventId);
            }
            return newSet;
        });
        console.log(registeredEvents.size);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registered for events:", Array.from(registeredEvents));
    };

    return (
        <div className={`${registerStyles.container} ${className || ""}`}>
            {/* Image Section (Background on mobile, 50% width on Desktop) */}
            <div className={registerStyles.imageSection}>
                <div className={registerStyles.imageWrapper}>
                    <Image
                        src="/player.png"
                        alt="Habya 2026 Player"
                        fill
                        priority
                        className={registerStyles.image}
                    />
                    <div className={registerStyles.mobileOverlay} />
                </div>
            </div>

            {/* Form Section */}
            <div className={registerStyles.formSection}>
                <div className={registerStyles.card}>
                    <PageTitle>Register for Events</PageTitle>
                    <PageSubtitle>
                        {registeredEvents.size > 0 ? `You have registered for ${registeredEvents.size} events` : "Select upto 2 events"}
                    </PageSubtitle>

                    <form onSubmit={handleSubmit}>
                        {isLoading ? (
                            <div className="flex justify-center p-8">
                                <div className="w-8 h-8 rounded-full border-4 border-black/20 border-t-black animate-spin"></div>
                            </div>
                        ) : (
                            <div className={registerStyles.listContainer}>
                                {events.map(event => {
                                    const isRegistered = registeredEvents.has(event.id);
                                    return (
                                        <div 
                                            key={event.id} 
                                            className={isRegistered ? registerStyles.listItemSelected : registerStyles.listItem}
                                            
                                        >
                                            <div className={registerStyles.eventInfo}>
                                                <div className={registerStyles.eventNameContainer} style={{cursor: registeredEvents.size >= 2 && !isRegistered ? "not-allowed" : "pointer"}}>
                                                    <span className={registerStyles.eventName}>
                                                        {event.name}
                                                    </span>
                                                    {!!event.tooltipContent && <div className={`${registerStyles.tooltipContainer} tooltip-container`}>
                                                        <svg className={registerStyles.infoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <div className={`${registerStyles.tooltipContent} tooltip-content`}>
                                                            <div className="flex flex-col gap-1.5 font-sans">
                                                                <p className="flex justify-between items-center"><span className="font-semibold text-white/70">Genders:</span> <span className="capitalize">{event.allowedGenders.join(', ')}</span></p>
                                                                <div className="mt-1 pt-1 border-t border-white/20">
                                                                    {event.tooltipContent}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <span className={registerStyles.eventDetails}>
                                                    ₹{event.price}&nbsp;{event.partnerRule ? "•   Partner's Name" : ""}
                                                </span>
                                            </div>
                                            
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={isRegistered}
                                                onClick={() => toggleEventRegistration(event.id)}
                                                className={`
                                                    ${registerStyles.toggleContainer} 
                                                    ${isRegistered ? registerStyles.toggleActive : registerStyles.toggleInactive}
                                                `}
                                                disabled={registeredEvents.size >= 2 && !isRegistered}
                                            >
                                                <span 
                                                    className={`
                                                        ${registerStyles.toggleHandleContainer}
                                                        ${isRegistered ? registerStyles.toggleHandleActive : registerStyles.toggleHandleInactive}
                                                    `} 
                                                />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <Button btnType="primary" type="submit" disabled={isLoading || registeredEvents.size === 0}>
                            Proceed to Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
