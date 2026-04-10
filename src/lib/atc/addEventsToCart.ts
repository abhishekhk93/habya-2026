import { Cart, RegistrationAttributes } from "./types";
import { addToCart } from "./addToCart";

export const addEventsToCart = (attributes: RegistrationAttributes): Cart => {
  // Build explicitly so JSON.stringify(localStorage) never drops keys (undefined is omitted).
  const itemAttributes: RegistrationAttributes = {
    categoryCode: attributes.categoryCode,
    partnerPlayerId: attributes.partnerPlayerId ?? null,
    partnerName: attributes.partnerName ?? null,
  };

  return addToCart({
    itemType: "REGISTRATION",
    itemAmount: null,
    itemQuantity: null,
    itemAttributes,
  });
};
