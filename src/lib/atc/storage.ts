import { Cart } from "./types";

const cartKeyForPlayer = (playerId: string) => `cart:${playerId}`;

function parseCart(serialized: string): Cart | null {
  try {
    const cart = JSON.parse(serialized) as Cart;
    if (!cart || !Array.isArray(cart.items)) {
      return null;
    }
    return cart;
  } catch {
    return null;
  }
}

export const getCart = (playerId: string | null | undefined): Cart => {
  if (typeof window === "undefined" || !playerId) {
    return { items: [] };
  }

  try {
    const key = cartKeyForPlayer(playerId);
    const serialized = localStorage.getItem(key);

    if (!serialized) {
      return { items: [] };
    }

    const cart = parseCart(serialized);
    return cart ?? { items: [] };
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return { items: [] };
  }
};

export const saveCart = (cart: Cart, playerId: string | null | undefined): void => {
  if (typeof window === "undefined" || !playerId) {
    return;
  }

  try {
    localStorage.setItem(cartKeyForPlayer(playerId), JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

export const clearCart = (playerId: string | null | undefined): void => {
  if (typeof window === "undefined" || !playerId) {
    return;
  }

  try {
    localStorage.removeItem(cartKeyForPlayer(playerId));
  } catch (error) {
    console.error("Failed to clear cart from localStorage", error);
  }
};
