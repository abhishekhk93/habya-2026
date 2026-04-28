import { ordersStyles } from "@/components/orders/Orders.styles";

export const checkoutStyles = {
  // Reusing the same wrapper and container from orders
  wrapper: ordersStyles.wrapper,
  container: ordersStyles.container,
  pageTitle: ordersStyles.pageTitle,
  pageSubtitle: ordersStyles.pageSubtitle,
  
  // Specific internal styles for Checkout
  innerContainer: "max-w-[480px] text-center",
  stepContainer: "flex flex-col gap-4 text-left mb-8",
  errorText: "text-red-500 text-sm mb-6",
  actionContainer: "mt-6",
};
