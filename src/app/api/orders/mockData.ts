import { OrdersResponse } from "./types";

export const mockOrdersDb: Record<string, OrdersResponse> = {
  "3434": {
    registrations: [
      {
        id: "1221",
        createdDate: "09/05/2026 10:25PM",
        amount: 1000,
        quantity: 1,
        paymentStatus: "PAID",
        createdBy: "HHH",
        additionalAttributes: {
          categoryName: "Open Men's doubles",
          categoryCode: "002",
          partnerDetails: {
            fullName: "HHH",
            playerId: "3344",
          },
        },
      },
      {
        id: "1234",
        createdDate: "09/05/2026 10:25PM",
        amount: 500,
        quantity: 1,
        paymentStatus: "PAID",
        createdBy: "HHH",
        additionalAttributes: {
          categoryName: "Open Men's singles",
          categoryCode: "001",
        },
      },
    ],
    tshirts: [
      {
        id: "2001",
        createdDate: "09/05/2026 10:25PM",
        amount: 1000,
        quantity: 1,
        paymentStatus: "PAID",
        createdBy: "HHH",
        additionalAttributes: {
          type: "collared",
          displayName: "Nahusha",
          size: "L",
          color: "Blue",
        },
      },
    ],
    sponsorships: [
      {
        id: "3001",
        createdDate: "09/05/2026 10:25PM",
        amount: 1000,
        quantity: 1,
        paymentStatus: "PAID",
        createdBy: "HHH",
        additionalAttributes: {},
      },
    ],
  },
  "1001": {
    registrations: [],
    tshirts: [],
    sponsorships: [],
  },
};
