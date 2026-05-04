import { Cart } from "./types";
import { addToCart } from "./addToCart";
import { getCart, saveCart } from "./storage";

export const addBagToCart = (
  quantity: number,
  playerId: string | null | undefined
): Cart => {
  const currentCart = getCart(playerId);
  const existingBagIndex = currentCart.items.findIndex(item => item.itemType === "BAG");

  if (existingBagIndex !== -1) {
    const updatedItems = [...currentCart.items];
    const existingItem = updatedItems[existingBagIndex];
    
    if (existingItem.itemType === "BAG") {
      updatedItems[existingBagIndex] = {
        ...existingItem,
        itemQuantity: existingItem.itemQuantity + quantity
      };
    }
    
    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems
    };
    
    saveCart(updatedCart, playerId);
    window.dispatchEvent(new Event("cart-updated"));
    return updatedCart;
  }

  return addToCart(
    {
      itemType: "BAG",
      itemAmount: null,
      itemQuantity: quantity,
      itemAttributes: null,
    },
    playerId
  );
};
