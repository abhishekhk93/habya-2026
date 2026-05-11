import { ordersStyles } from "@/components/orders/Orders.styles";

export const paymentCompleteStyles = {
  wrapper: `${ordersStyles.wrapper} !justify-start pt-16 md:pt-24`,
  container: `${ordersStyles.container} max-w-[500px]`,
  pageTitle: ordersStyles.pageTitle,
  pageSubtitle: ordersStyles.pageSubtitle,

  innerContainer: "text-center pt-4 pb-4",
  subtitleText: "mt-3 mb-4 text-[15px] text-gray-500 max-w-[420px] mx-auto leading-relaxed px-4",
  
  iconContainer: "mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-3 ring-8 ring-gray-50/50",
  icon: "w-12 h-12 text-gray-400",

  listContainer: "flex flex-col gap-4 text-left max-w-[380px] mx-auto mt-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100",
  listItem: "flex items-start gap-4",
  listIconWrapper: "w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 shrink-0",
  listIcon: "w-4 h-4 text-gray-600",
  listText: "text-[13px] text-gray-600 leading-snug",

  actionContainer: "mt-10 flex flex-col items-center gap-4",
};
