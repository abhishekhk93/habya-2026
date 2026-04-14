"use client";

import { useEffect, useState } from "react";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";
import type { EventType } from "./EventRegistration.types";
import PartnerIdModal from "./PartnerIdModal";
import { EventList } from "../EventList";
import { useEventData } from "./useEventData";
import { addEventsToCart } from "@/lib/atc/addEventsToCart";
import { getCart, saveCart } from "@/lib/atc/storage";
import type { RegistrationAttributes } from "@/lib/atc/types";
import { useAppSelector } from "@/store/hooks";

export default function EventRegistration() {
  const userFullName = useAppSelector((state) => state.auth.user?.fullName) ?? "";
  const userPlayerId = useAppSelector((state) => state.auth.user?.playerId);

  const { data, loading, error, initialSelectedIds, initialDoublesPartners } = useEventData(userFullName, userPlayerId);

  const [selectedEventIds, setSelectedEventIds] = useState<Set<number>>(new Set());
  const [doublesModalEvent, setDoublesModalEvent] = useState<EventType | null>(null);
  const [doublesPartners, setDoublesPartners] = useState<Record<number, { id: string; name: string }>>({});

  // Sync initial state once data is loaded
  useEffect(() => {
    if (!loading && data) {
      setSelectedEventIds(initialSelectedIds);
      setDoublesPartners(initialDoublesPartners);
    }
  }, [loading, data, initialSelectedIds, initialDoublesPartners]);

  const removeRegistrationFromCart = (categoryCode: string) => {
    const currentCart = getCart(userPlayerId);
    const codeNum = Number(categoryCode);
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => {
        if (item.itemType !== "REGISTRATION") return true;
        const c = item.itemAttributes.categoryCode;
        return c !== categoryCode && Number(c) !== codeNum;
      }),
    };
    saveCart(updatedCart, userPlayerId);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const addOrReplaceRegistrationInCart = (attributes: RegistrationAttributes) => {
    removeRegistrationFromCart(attributes.categoryCode);
    addEventsToCart(attributes, userPlayerId);
  };

  const handleToggle = (event: EventType, isPreRegistered: boolean) => {
    // Cannot toggle an event the user has already formally registered for
    if (isPreRegistered) return;

    const newSet = new Set(selectedEventIds);

    if (newSet.has(event.eventId)) {
      newSet.delete(event.eventId);
      setSelectedEventIds(newSet);
      removeRegistrationFromCart(event.categoryCode);
      setDoublesPartners(prev => {
        const next = { ...prev };
        delete next[event.eventId];
        return next;
      });
      return;
    }

    if (newSet.size >= 2) return;

    // For DOUBLES, open the partner modal instead of immediately selecting
    if (event.type === "DOUBLES") {
      setDoublesModalEvent(event);
      return;
    }

    newSet.add(event.eventId);
    setSelectedEventIds(newSet);
    addOrReplaceRegistrationInCart({
      categoryCode: event.categoryCode,
      partnerPlayerId: null,
      partnerName: null,
    });
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
    <>
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

          <EventList
            data={data}
            selectedEventIds={selectedEventIds}
            doublesPartners={doublesPartners}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {doublesModalEvent && (
        <PartnerIdModal
          eventName={doublesModalEvent.name}
          eventId={doublesModalEvent.eventId}
          categoryCode={doublesModalEvent.categoryCode}
          onClose={() => setDoublesModalEvent(null)}
          onConfirm={({ partnerId, partnerName }) => {
            addOrReplaceRegistrationInCart({
              categoryCode: doublesModalEvent.categoryCode,
              partnerPlayerId: partnerId,
              partnerName,
            });
            setDoublesPartners(prev => ({
              ...prev,
              [doublesModalEvent.eventId]: { id: partnerId, name: partnerName },
            }));
            const newSet = new Set(selectedEventIds);
            newSet.add(doublesModalEvent.eventId);
            setSelectedEventIds(newSet);
          }}
        />
      )}
    </>
  );
}
