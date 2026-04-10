"use client";

import { useEffect, useState, Fragment } from "react";
import { eventRegistrationStyles as s } from "./EventRegistration.styles";
import type { EventType, RegisterResponse } from "./EventRegistration.types";
import PartnerIdModal from "./PartnerIdModal";
import { addEventsToCart } from "@/lib/atc/addEventsToCart";
import { getCart, saveCart } from "@/lib/atc/storage";
import type { RegistrationAttributes } from "@/lib/atc/types";
import { useAppSelector } from "@/store/hooks";
import type { EligibleEventsResponse } from "@/app/api/eligible-events/types";
import type { Order } from "@/app/api/orders/types";
import {
  flattenRegistrations,
  buildRegistrationLookup,
  mergeEligibleWithRegistrations,
  transformToEventUIModel,
} from "@/lib/registration";

export default function EventRegistration() {
  const userFullName = useAppSelector((state) => state.auth.user?.fullName) ?? "";
  const userPlayerId = useAppSelector((state) => state.auth.user?.playerId) ?? "0";

  const [data, setData] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEventIds, setSelectedEventIds] = useState<Set<number>>(new Set());
  const [doublesModalEvent, setDoublesModalEvent] = useState<EventType | null>(null);
  const [doublesPartners, setDoublesPartners] = useState<Record<number, { id: string; name: string }>>({});

  const removeRegistrationFromCart = (categoryCode: string) => {
    const currentCart = getCart();
    const codeNum = Number(categoryCode);
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => {
        if (item.itemType !== "REGISTRATION") return true;
        const c = item.itemAttributes.categoryCode;
        return c !== categoryCode && Number(c) !== codeNum;
      }),
    };
    saveCart(updatedCart);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const addOrReplaceRegistrationInCart = (attributes: RegistrationAttributes) => {
    removeRegistrationFromCart(attributes.categoryCode);
    addEventsToCart(attributes);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [eligibleEventsResponse, ordersResponse] = await Promise.all([
          fetch("/api/eligible-events"),
          fetch("/api/orders?type=registrations&includePartnerRegistrations=true"),
        ]);

        if (!eligibleEventsResponse.ok || !ordersResponse.ok) {
          throw new Error("Failed to fetch event data.");
        }

        const [eligibleEventsJson, ordersJson]: [EligibleEventsResponse, Order[]] = await Promise.all([
          eligibleEventsResponse.json(),
          ordersResponse.json(),
        ]);

        const registrations = flattenRegistrations(ordersJson);
        const registrationMap = buildRegistrationLookup(registrations, userFullName);
        const mergedEvents = mergeEligibleWithRegistrations(
          eligibleEventsJson.eligibleCategories,
          registrationMap
        );
        const eligibleEvents = transformToEventUIModel(mergedEvents);
        const transformedData: RegisterResponse = {
          userId: Number(userPlayerId),
          eligibleEvents,
        };
        setData(transformedData);

        // Preselect events they are already registered for
        const preRegisteredIds = eligibleEvents
          .filter(e => e.registration.isRegistered)
          .map(e => e.eventId);

        // Also preselect events already present in cart (and hydrate doubles partner names)
        const cart = getCart();
        const cartRegistrations = cart.items.filter((item) => item.itemType === "REGISTRATION");

        const cartSelectedIds: number[] = [];
        const cartDoublesPartners: Record<number, { id: string; name: string }> = {};

        cartRegistrations.forEach((item) => {
          const code = item.itemAttributes.categoryCode;
          const eventId = Number(code);
          if (!Number.isFinite(eventId)) return;

          cartSelectedIds.push(eventId);

          const inEligibleList = eligibleEvents.find(
            (e) => e.categoryCode === code || e.eventId === eventId
          );
          if (inEligibleList?.type !== "DOUBLES") return;

          const partnerId = item.itemAttributes.partnerPlayerId ?? "";
          const partnerName = item.itemAttributes.partnerName ?? "";
          if (partnerId || partnerName) {
            cartDoublesPartners[eventId] = {
              id: partnerId,
              name: partnerName || partnerId,
            };
          }
        });

        setDoublesPartners((prev) => ({ ...cartDoublesPartners, ...prev }));
        setSelectedEventIds(new Set([...preRegisteredIds, ...cartSelectedIds]));

      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userFullName, userPlayerId]);

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
              if (event.type === "DOUBLES" && doublesPartners[event.eventId]) {
                subtitleDisplay = `Event added to cart with partner: ${doublesPartners[event.eventId].name}`;
              } else {
                subtitleDisplay = `Event added to cart`;
              }
            }

            return (
              <Fragment key={event.eventId}>
                <div
                  className={`${s.eventItem} ${(isSelected || isPreRegistered) ? 'border border-black/10' : ''} ${(isSelected || isPreRegistered) ? 'bg-gradient-to-r from-black/5 to-white' : 'bg-transparent'}`}
                >
                  <div className={s.eventInfo}>
                    <h3 className={s.eventName}>{event.name}</h3>
                    <p className={`${s.eventSubtitle} ${subtitleDisplay ? 'opacity-100' : 'opacity-0'}`}>
                      {subtitleDisplay || '\u00A0'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggle(event, isPreRegistered)}
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
                {index < data.eligibleEvents.length - 1 && (
                  <div className="h-px bg-black/5 w-[calc(100%-2rem)] mx-auto" />
                )}
              </Fragment>
            );
          })}
        </div>

      </div>
    </div >

      {
    doublesModalEvent && (
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
    )
  }
    </>
  );
}
