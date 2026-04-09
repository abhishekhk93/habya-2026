import { Cart, CartItem } from "./types";
import { getCart, saveCart } from "./storage";

export const addToCart = (item: CartItem): Cart => {
  const currentCart = getCart();
  const updatedCart: Cart = {
    ...currentCart,
    items: [...currentCart.items, item],
  };

  saveCart(updatedCart);
  window.dispatchEvent(new Event("cart-updated"));

  return updatedCart;
};
