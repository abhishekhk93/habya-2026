import { Cart } from "./types";

const CART_KEY = "cart";

export const getCart = (): Cart => {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const serialized = localStorage.getItem(CART_KEY);
    if (!serialized) {
      return { items: [] };
    }

    const cart = JSON.parse(serialized) as Cart;
    if (!cart || !Array.isArray(cart.items)) {
      return { items: [] };
    }

    return cart;
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return { items: [] };
  }
};

export const saveCart = (cart: Cart): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};
