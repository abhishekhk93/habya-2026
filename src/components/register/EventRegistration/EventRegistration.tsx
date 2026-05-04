"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";
import type { EventType } from "./EventRegistration.types";
import PartnerIdModal from "./PartnerIdModal";
import { EventList } from "../EventList";
import { useEventData } from "./useEventData";
import { addEventsToCart } from "@/lib/atc/addEventsToCart";
import { getCart, saveCart } from "@/lib/atc/storage";
import type { RegistrationAttributes } from "@/lib/atc/types";
import { useAppSelector } from "@/store/hooks";
import { ClosedState } from "../../common/ClosedState";
import { Loader } from "../../common/Loader";
import Button from "../../uiComponents/Button";

export default function EventRegistration() {
  const isRegistrationOpen = useAppSelector((state) => state.config.data?.is_registration_open);
  const userFullName = useAppSelector((state) => state.auth.user?.fullName) ?? "";

  const userPlayerId = useAppSelector((state) => state.auth.user?.playerId);

  const { data, loading, error, initialSelectedIds, initialDoublesPartners } = useEventData(userFullName, userPlayerId);

  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());
  const [doublesModalEvent, setDoublesModalEvent] = useState<EventType | null>(null);
  const [doublesPartners, setDoublesPartners] = useState<Record<string, { id: string; name: string }>>({});

  // Sync initial state once data is loaded
  useEffect(() => {
    if (!loading && data) {
      setSelectedEventIds(initialSelectedIds);
      setDoublesPartners(initialDoublesPartners);
    }
  }, [loading, data, initialSelectedIds, initialDoublesPartners]);

  const removeRegistrationFromCart = (categoryCode: string) => {
    const currentCart = getCart(userPlayerId);
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => {
        if (item.itemType !== "REGISTRATION") return true;
        const c = item.itemAttributes.categoryCode;
        return c !== categoryCode;
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

    if (newSet.has(event.categoryId)) {
      newSet.delete(event.categoryId);
      setSelectedEventIds(newSet);
      removeRegistrationFromCart(event.categoryId);
      setDoublesPartners(prev => {
        const next = { ...prev };
        delete next[event.categoryId];
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

    newSet.add(event.categoryId);
    setSelectedEventIds(newSet);
    addOrReplaceRegistrationInCart({
      categoryCode: event.categoryId,
      categoryName: event.name,
      partnerPlayerId: null,
      partnerName: null,
    });
  };

  if (loading || isRegistrationOpen === undefined) {
    return (
      <div className={s.wrapper}>
        <div className={s.card}>
          <Loader message="Warming up registrations..." />
        </div>
      </div>
    );
  }

  if (!isRegistrationOpen) {
    return (
      <div className={s.wrapper}>
        <div className={s.wrapper}>
          <ClosedState
            title="Registration is Closed"
            description="Event registrations for Habya 2026 are currently closed. Please check back later for updates."
            theme="indigo"
          />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={s.wrapper}>
        <div className={s.card}>
          <p className={s.errorState}>{error}</p>
          <Button style={{ marginTop: "10px", width: "fit-content", alignSelf: "center" }} btnType='small'>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.card}>
          <h1 className={s.header}>Eligible Events</h1>
          <div className={s.dividerContainer}>
            <div className={s.dividerText}>
              Selected: {selectedEventIds.size} out of 2 events
            </div>
          </div>

          <EventList
            data={data}
            selectedEventIds={selectedEventIds}
            doublesPartners={doublesPartners}
            onToggle={handleToggle}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', width: '100%', alignItems: 'center' }}>
            <Button style={{ width: '100%', maxWidth: '240px' }} btnType='small'>
              <Link href="/cart">Go to Cart</Link>
            </Button>
          </div>
        </div>
      </div>

      {doublesModalEvent && (
        <PartnerIdModal
          eventName={doublesModalEvent.name}
          categoryCode={doublesModalEvent.categoryId}
          onClose={() => setDoublesModalEvent(null)}
          onConfirm={({ partnerId, partnerName }) => {
            addOrReplaceRegistrationInCart({
              categoryCode: doublesModalEvent.categoryId,
              categoryName: doublesModalEvent.name,
              partnerPlayerId: partnerId,
              partnerName,
            });
            setDoublesPartners(prev => ({
              ...prev,
              [doublesModalEvent.categoryId]: { id: partnerId, name: partnerName },
            }));
            const newSet = new Set(selectedEventIds);
            newSet.add(doublesModalEvent.categoryId);
            setSelectedEventIds(newSet);
          }}
        />
      )}
    </>
  );
}
