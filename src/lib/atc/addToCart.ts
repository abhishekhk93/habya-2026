import { Cart, CartItem } from "./types";
import { getCart, saveCart } from "./storage";

export const addToCart = (
  item: CartItem,
  playerId: string | null | undefined
): Cart => {
  const currentCart = getCart(playerId);
  const updatedCart: Cart = {
    ...currentCart,
    items: [...currentCart.items, item],
  };

  saveCart(updatedCart, playerId);
  window.dispatchEvent(new Event("cart-updated"));

  return updatedCart;
};
