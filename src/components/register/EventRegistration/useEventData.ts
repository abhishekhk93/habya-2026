import { useState, useEffect } from "react";
import { getCart } from "@/lib/atc/storage";
import type { EligibleEventsResponse } from "@/app/api/eligible-events/types";
import type { Order } from "@/app/api/orders/types";
import {
  flattenRegistrations,
  buildRegistrationLookup,
  mergeEligibleWithRegistrations,
  transformToEventUIModel,
} from "@/lib/registration";
import type { RegisterResponse } from "./EventRegistration.types";

export interface EventDataHookResult {
  data: RegisterResponse | null;
  loading: boolean;
  error: string | null;
  initialSelectedIds: Set<number>;
  initialDoublesPartners: Record<number, { id: string; name: string }>;
}

export function useEventData(userFullName: string, userPlayerId?: string): EventDataHookResult {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [initialSelectedIds, setInitialSelectedIds] = useState<Set<number>>(new Set());
  const [initialDoublesPartners, setInitialDoublesPartners] = useState<Record<number, { id: string; name: string }>>({});

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
          userId: userPlayerId != null && userPlayerId !== "" ? Number(userPlayerId) : 0,
          eligibleEvents,
        };
        setData(transformedData);

        // Preselect events they are already registered for
        const preRegisteredIds = eligibleEvents
          .filter(e => e.registration.isRegistered)
          .map(e => e.eventId);

        // Also preselect events already present in cart (and hydrate doubles partner names)
        const cart = getCart(userPlayerId);
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

        setInitialDoublesPartners(cartDoublesPartners);
        setInitialSelectedIds(new Set([...preRegisteredIds, ...cartSelectedIds]));

      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userFullName, userPlayerId]);

  return {
    data,
    loading,
    error,
    initialSelectedIds,
    initialDoublesPartners,
  };
}
