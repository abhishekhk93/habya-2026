import { Cart, TShirtAttributes } from "./types";
import { addToCart } from "./addToCart";

export const addShirtsToCart = (attributes: TShirtAttributes): Cart => {
  return addToCart({
    itemType: "TSHIRT",
    itemAmount: null,
    itemQuantity: 1,
    itemAttributes: attributes,
  });
};
