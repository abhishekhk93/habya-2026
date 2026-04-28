import { CheckoutResponse } from "./types";

export const mockCheckoutResponse: CheckoutResponse = {
  orderId: "ORD-1001",
  razorpayOrderId: "order_RZP_ABC123",
  paymentStatus: "PENDING",
  transactionId: null,
  totalOrderAmount: {
    orderAmount: 9000,
    platformFee: 180,
  },
  items: [
    {
      itemId: "10001",
      itemType: "REGISTRATION",
      itemAmount: 1000,
      itemQuantity: 1,
      itemAttributes: {
        categoryCode: "001",
        partnerPlayerId: null,
      },
    },
    {
      itemId: "10002",
      itemType: "REGISTRATION",
      itemAmount: 1000,
      itemQuantity: 1,
      itemAttributes: {
        categoryCode: "002",
        partnerPlayerId: "P123",
      },
    },
    {
      itemId: "10003",
      itemType: "TSHIRT",
      itemAmount: 1000,
      itemQuantity: 1,
      itemAttributes: {
        type: "COLLARED",
        displayName: "ABHI",
        size: "M",
      },
    },
    {
      itemId: "10005",
      itemType: "TSHIRT",
      itemAmount: 1000,
      itemQuantity: 1,
      itemAttributes: {
        type: "ROUND_NECK",
        displayName: "ABHISHEK",
        size: "L",
      },
    },
    {
      itemId: "10006",
      itemType: "SPONSORSHIP",
      itemAmount: 5000,
      itemQuantity: 1,
      itemAttributes: {},
    },
  ],
};
