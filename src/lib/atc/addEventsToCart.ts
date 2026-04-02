import { Cart, RegistrationAttributes } from "./types";
import { addToCart } from "./addToCart";

export const addEventsToCart = (attributes: RegistrationAttributes): Cart => {
  return addToCart({
    itemType: "REGISTRATION",
    itemAmount: null,
    itemQuantity: null,
    itemAttributes: attributes,
  });
};
