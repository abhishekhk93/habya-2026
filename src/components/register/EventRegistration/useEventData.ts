import { useState, useEffect } from "react";
import { getCart } from "@/lib/atc/storage";
import type { EligibleEventsResponse } from "@/app/_disabled_api/eligible-events/types";
import { fetchApi } from "@/lib/fetchApi";
import type { RegisterResponse, EventType } from "./EventRegistration.types";

export interface EventDataHookResult {
  data: RegisterResponse | null;
  loading: boolean;
  error: string | null;
  initialSelectedIds: Set<string>;
  initialDoublesPartners: Record<string, { id: string; name: string }>;
}

export function useEventData(userFullName: string, userPlayerId?: string): EventDataHookResult {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [initialSelectedIds, setInitialSelectedIds] = useState<Set<string>>(new Set());
  const [initialDoublesPartners, setInitialDoublesPartners] = useState<Record<string, { id: string; name: string }>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const eligibleEventsJson = await fetchApi<EligibleEventsResponse>("/api/eligible-events");

        // 1. Filter and Merge categories into the UI model
        const eligibleEvents: EventType[] = eligibleEventsJson.eligibleCategories
          .filter((cat) => cat.isEnabled && cat.isEligible)
          .map((cat) => {
            return {
              categoryId: cat.categoryId,
              name: cat.categoryName,
              type: cat.categoryType.toUpperCase() as "SINGLES" | "DOUBLES",
              categoryDescription: cat.categoryDescription,
              isEnabled: cat.isEnabled,
              registration: {
                isRegistered: cat.isRegistered,
                partner: cat.partnerDetails ? { name: cat.partnerDetails.fullName } : null,
              },
            };
          });

        const transformedData: RegisterResponse = {
          userId: userPlayerId != null && userPlayerId !== "" ? Number(userPlayerId) : 0,
          eligibleEvents,
        };
        setData(transformedData);

        // 2. Identify already registered events
        const preRegisteredIds = eligibleEvents
          .filter(e => e.registration.isRegistered)
          .map(e => e.categoryId);

        // 3. Sync with Cart (items added but not yet formally registered)
        const cart = getCart(userPlayerId);
        const cartRegistrations = cart.items.filter((item) => item.itemType === "REGISTRATION");

        const cartSelectedIds: string[] = [];
        const cartDoublesPartners: Record<string, { id: string; name: string }> = {};

        cartRegistrations.forEach((item) => {
          // Backward compatibility: check both categoryId and categoryCode
          const categoryId = item.itemAttributes.categoryId || (item.itemAttributes as any).categoryCode;
          if (!categoryId) return;

          cartSelectedIds.push(categoryId);

          const inEligibleList = eligibleEvents.find(
            (e) => e.categoryId === categoryId
          );
          if (inEligibleList?.type !== "DOUBLES") return;

          const partnerId = item.itemAttributes.partnerPlayerId ?? "";
          const partnerName = item.itemAttributes.partnerName ?? "";
          if (partnerId || partnerName) {
            cartDoublesPartners[categoryId] = {
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
