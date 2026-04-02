import { Cart } from "./types";
import { addToCart } from "./addToCart";

export const addSponsorshipToCart = ({ amount }: { amount: number }): Cart => {
  return addToCart({
    itemType: "SPONSORSHIP",
    itemAmount: amount,
    itemQuantity: null,
    itemAttributes: {},
  });
};
