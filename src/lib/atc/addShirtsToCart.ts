import { Cart, TShirtAttributes } from "./types";
import { addToCart } from "./addToCart";

export const addShirtsToCart = (
  attributes: TShirtAttributes,
  playerId: string | null | undefined
): Cart => {
  return addToCart(
    {
      itemType: "TSHIRT",
      itemAmount: null,
      itemQuantity: 1,
      itemAttributes: attributes,
    },
    playerId
  );
};
