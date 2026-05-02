import type { EligibleCategory } from "@/app/_disabled_api/eligible-events/types";
import type { Order, RegistrationItem } from "@/app/_disabled_api/orders/types";
import type { EventType } from "@/components/register/EventRegistration/EventRegistration.types";

export interface RegistrationLookupValue {
  isRegistered: boolean;
  partnerName: string | null;
}

/** Stable string for cart/API (e.g. "003"); preserves leading zeros when id is numeric. */
export const normalizeCategoryCode = (categoryId: string | number): string => {
  const s = String(categoryId).trim();
  if (/^\d+$/.test(s)) {
    return s.padStart(3, "0");
  }
  return s;
};

export interface MergedEligibleRegistration {
  categoryId: string;
  categoryName: string;
  categoryType: "SINGLES" | "DOUBLES";
  categoryDescription: string;
  isEnabled: boolean;
  isRegistered: boolean;
  partnerName: string | null;
}

export const flattenRegistrations = (orders: Order[]): RegistrationItem[] => {
  return orders.flatMap((order) => order.registrations ?? []);
};

export const buildRegistrationLookup = (
  registrations: RegistrationItem[],
  currentUserName: string
): Map<string, RegistrationLookupValue> => {
  const lookup = new Map<string, RegistrationLookupValue>();

  registrations.forEach((registration) => {
    const categoryId = registration.additionalAttributes.categoryId;
    const partnerDetails = registration.additionalAttributes.partnerDetails;
    const partnerName = partnerDetails
      ? registration.createdBy === currentUserName
        ? partnerDetails.fullName
        : registration.createdBy
      : null;

    lookup.set(categoryId, {
      isRegistered: true,
      partnerName,
    });
  });

  return lookup;
};

export const mergeEligibleWithRegistrations = (
  eligibleCategories: EligibleCategory[],
  registrationMap: Map<string, RegistrationLookupValue>
): MergedEligibleRegistration[] => {
  return eligibleCategories.map((category) => {
    const registration = registrationMap.get(category.categoryId);

    return {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      categoryType: category.categoryType as "SINGLES" | "DOUBLES",
      categoryDescription: category.categoryDescription,
      isEnabled: category.isEnabled,
      isRegistered: registration?.isRegistered ?? false,
      partnerName: registration?.partnerName ?? null,
    };
  });
};

export const transformToEventUIModel = (
  mergedData: MergedEligibleRegistration[]
): EventType[] => {
  return mergedData.map((item) => {
    const categoryId = normalizeCategoryCode(item.categoryId);
    return {
      eventId: Number(categoryId),
      categoryId,
      name: item.categoryName,
      type: item.categoryType,
      categoryDescription: item.categoryDescription,
      isEnabled: item.isEnabled,
      registration: {
        isRegistered: item.isRegistered,
        partner: item.partnerName ? { name: item.partnerName } : null,
      },
    };
  });
};
