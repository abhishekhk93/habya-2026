import { useState, useEffect } from "react";
import { getCart } from "@/lib/atc/storage";
import type { EligibleEventsResponse } from "@/app/_disabled_api/eligible-events/types";
import type { Order } from "@/app/_disabled_api/orders/types";
import {
  flattenRegistrations,
  buildRegistrationLookup,
  mergeEligibleWithRegistrations,
  transformToEventUIModel,
} from "@/lib/registration";
import { fetchApi } from "@/lib/fetchApi";
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
        const [eligibleEventsJson, ordersJson] = await Promise.all([
          fetchApi<EligibleEventsResponse>("/api/eligible-events"),
          fetchApi<Order[]>("/api/orders?type=registrations&includePartnerRegistrations=true"),
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

        const preRegisteredIds = eligibleEvents
          .filter(e => e.registration.isRegistered)
          .map(e => e.eventId);

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
            (e) => e.categoryId === code || e.eventId === eventId
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
