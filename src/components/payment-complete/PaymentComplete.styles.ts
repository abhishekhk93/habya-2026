import { ordersStyles } from "@/components/orders/Orders.styles";
import { signInFormStyles as authStyles } from "@/components/auth/Auth/AuthForm.styles";

export const paymentCompleteStyles = {
  wrapper: `${ordersStyles.wrapper} !justify-center`,
  container: `${ordersStyles.container} max-w-[500px]`,
  pageTitle: ordersStyles.pageTitle,
  pageSubtitle: ordersStyles.pageSubtitle,

  innerContainer: "text-center pt-4",
  subtitleText: "mt-4 mb-4 text-sm text-gray-500 max-w-[420px] mx-auto leading-relaxed",
  
  iconContainer: "mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50",
  icon: "w-10 h-10 text-green-600",

  listContainer: "flex flex-col gap-4 text-left max-w-[380px] mx-auto mt-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100",
  listItem: "flex items-start gap-4",
  listIconWrapper: "w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 shrink-0",
  listIcon: "w-4 h-4 text-gray-600",
  listText: "text-[13px] text-gray-600 leading-snug",
  
  actionContainer: "mt-10",
  backLink: authStyles.backLink,
};
