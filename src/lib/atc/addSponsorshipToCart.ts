import { Cart } from "./types";
import { addToCart } from "./addToCart";

export const addSponsorshipToCart = ({
  amount,
  playerId,
}: {
  amount: number;
  playerId: string | null | undefined;
}): Cart => {
  return addToCart(
    {
      itemType: "SPONSORSHIP",
      itemAmount: amount,
      itemQuantity: null,
      itemAttributes: {},
    },
    playerId
  );
};
