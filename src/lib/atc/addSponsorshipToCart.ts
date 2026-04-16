import { Cart } from "./types";
import { addToCart } from "./addToCart";
import { getCart, saveCart } from "./storage";

export const addSponsorshipToCart = ({
  amount,
  playerId,
}: {
  amount: number;
  playerId: string | null | undefined;
}): Cart => {
  // First, remove any existing sponsorship item to ensure only one exists
  const currentCart = getCart(playerId);
  const filteredItems = currentCart.items.filter(item => item.itemType !== "SPONSORSHIP");
  saveCart({ ...currentCart, items: filteredItems }, playerId);

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
