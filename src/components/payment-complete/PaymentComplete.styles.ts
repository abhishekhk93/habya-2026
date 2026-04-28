import { ordersStyles } from "@/components/orders/Orders.styles";
import { signInFormStyles as authStyles } from "@/components/auth/Auth/AuthForm.styles";

export const paymentCompleteStyles = {
  wrapper: ordersStyles.wrapper,
  container: ordersStyles.container,
  pageTitle: ordersStyles.pageTitle,
  pageSubtitle: ordersStyles.pageSubtitle,

  innerContainer: "text-center",
  subtitleText: "mt-4 mb-8 text-base max-w-[420px] mx-auto leading-relaxed",
  actionContainer: "mt-6",
  backLink: authStyles.backLink,
};
