import { useState, useEffect } from "react";
import { getCart } from "@/lib/atc/storage";
import type { EligibleEventsResponse } from "@/app/_disabled_api/eligible-events/types";
import type { Order } from "@/app/_disabled_api/orders/types";
import { normalizeCategoryCode } from "@/lib/registration";
import { fetchApi } from "@/lib/fetchApi";
import type { RegisterResponse, EventType } from "./EventRegistration.types";

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

        // 1. Flatten registrations from all successful orders
        const allRegistrations = ordersJson.flatMap((order) => order.registrations ?? []);

        // 2. Build an efficient lookup map (O(n))
        const registrationLookup = new Map<string, { isRegistered: boolean; partnerName: string | null }>();
        allRegistrations.forEach((reg) => {
          const catId = reg.additionalAttributes.categoryId;
          const partnerDetails = reg.additionalAttributes.partnerDetails;

          let partnerName: string | null = null;
          if (partnerDetails) {
            // Partner logic: If I am the partner, the partner is the creator. Otherwise, it's the named partner.
            partnerName = partnerDetails.fullName === userFullName
              ? reg.createdBy
              : partnerDetails.fullName;
          }

          registrationLookup.set(catId, { isRegistered: true, partnerName });
        });

        // 3. Merge eligible categories with registration info and transform to UI model
        const eligibleEvents: EventType[] = eligibleEventsJson.eligibleCategories.map((cat) => {
          const reg = registrationLookup.get(cat.categoryId);
          const normalizedId = normalizeCategoryCode(cat.categoryId);

          return {
            eventId: Number(normalizedId),
            categoryId: normalizedId,
            name: cat.categoryName,
            type: cat.categoryType as "SINGLES" | "DOUBLES",
            categoryDescription: cat.categoryDescription,
            isEnabled: cat.isEnabled,
            registration: {
              isRegistered: !!reg,
              partner: reg?.partnerName ? { name: reg.partnerName } : null,
            },
          };
        });
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
