"use client";

import React, { useEffect, useState } from "react";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";
import type { EventType, RegisterResponse } from "./EventRegistration.types";

export default function EventRegistration() {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEventIds, setSelectedEventIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/register");
        if (!response.ok) {
          throw new Error("Failed to fetch event data.");
        }

        const jsonData: RegisterResponse = await response.json();
        setData(jsonData);

        // Initialize the selected set ONLY with events they are already registered for
        const preRegistered = jsonData.eligibleEvents.filter(e => e.registration.isRegistered).map(e => e.eventId);
        setSelectedEventIds(new Set(preRegistered));

      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (eventId: number, isPreRegistered: boolean) => {
    // Cannot toggle an event the user has already formally registered for
    if (isPreRegistered) return;

    const newSet = new Set(selectedEventIds);

    // If it is already selected in local state, allow them to turn it off
    if (newSet.has(eventId)) {
      newSet.delete(eventId);
    } else {
      // Limit logic: totally only two events can be turned on
      if (newSet.size >= 2) return;
      newSet.add(eventId);
    }

    setSelectedEventIds(newSet);
  };

  if (loading) {
    return (
      <div className={s.wrapper}>
        <div className={s.card}>
          <p className={s.loadingState}>Loading eligible events...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={s.wrapper}>
        <div className={s.card}>
          <p className={s.errorState}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>Eligible Events</h1>
        <div className={`${s.subtitle} ${selectedEventIds.size >= 2 ? s.maxSelectedEffect : "text-black/60"}`}>
          <div className="grid items-center justify-items-center">
            <span className={`col-start-1 row-start-1 transition-opacity duration-500 ease-in-out ${selectedEventIds.size >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              Maximum events selected
            </span>
            <span className={`col-start-1 row-start-1 transition-opacity duration-500 ease-in-out ${selectedEventIds.size < 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              Select up to 2 events
            </span>
          </div>
        </div>

        <div className={s.listContainer}>
          {data.eligibleEvents.map((event, index) => {
            const isPreRegistered = event.registration.isRegistered;
            const isSelected = selectedEventIds.has(event.eventId);
            const canInteract = !isPreRegistered && (isSelected || selectedEventIds.size < 2);

            let subtitleDisplay = "";
            if (isPreRegistered) {
              subtitleDisplay = "Registered for this event";
              if (event.type === "DOUBLES" && event.registration.partner) {
                subtitleDisplay += ` with partner: ${event.registration.partner.name}`;
              }
            } else if (isSelected) {
              subtitleDisplay = `Selected for registration`;
            }

            return (
              <div
                key={event.eventId}
                className={`${s.eventItem} ${isPreRegistered ? 'border border-black/10' : ''} ${isSelected && !isPreRegistered ? 'bg-black/[0.03]' : 'bg-transparent'}`}
              >
                <div className={s.eventInfo}>
                  <h3 className={s.eventName}>{event.name}</h3>
                  <p className={`${s.eventSubtitle} ${subtitleDisplay ? 'opacity-100' : 'opacity-0'}`}>
                    {subtitleDisplay || '\u00A0'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(event.eventId, isPreRegistered)}
                  disabled={!canInteract}
                  className={`
                    ${s.toggleWrapper} 
                    ${isSelected ? s.toggleEnabled : s.toggleDisabled} 
                    ${!canInteract && !isPreRegistered ? "opacity-30 cursor-not-allowed" : ""} 
                    ${isPreRegistered ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  <span
                    className={`
                      ${s.toggleThumb} 
                      ${isSelected ? s.toggleThumbActive : s.toggleThumbInactive}
                    `}
                  />
                </button>
              </div>
              </React.Fragment>
        );
          })}
      </div>
    </div>
    </div >
  );
}
