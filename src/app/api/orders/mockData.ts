import { Order } from "./types";

export const mockOrdersDb: Record<string, Order[]> = {
  "3434": [
    {
      orderId: "ORD-1",
      transactionId: "TXN-1",
      paymentStatus: "SUCCESS",
      totalOrderAmount: {
        orderAmount: 3000,
        platformFee: 60,
      },
      registrations: [
        {
          id: "REG-1",
          createdDate: "10/05/2026 09:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            categoryName: "Singles",
            categoryCode: "001",
          },
        },
      ],
      shirts: [
        {
          id: "TS-1",
          createdDate: "10/05/2026 09:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            type: "collared",
            size: "L",
            color: "Blue",
            displayName: "ABHI",
          },
        },
        {
          id: "TS-2",
          createdDate: "10/05/2026 09:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            type: "round",
            size: "M",
            color: "Black",
            displayName: "Abhi",
          },
        },
      ],
      sponsorships: [
        {
          id: "SP-1",
          createdDate: "10/05/2026 09:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {},
        },
      ],
    },
    {
      orderId: "ORD-2",
      transactionId: "TXN-2",
      paymentStatus: "SUCCESS",
      totalOrderAmount: {
        orderAmount: 3000,
        platformFee: 60,
      },
      registrations: [
        {
          id: "REG-2",
          createdDate: "10/05/2026 10:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            categoryName: "Open Men's Doubles",
            categoryCode: "002",
            partnerDetails: {
              fullName: "Kiran",
              playerId: "3344",
            },
          },
        },
      ],
      shirts: [
        {
          id: "TS-3",
          createdDate: "10/05/2026 10:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            type: "collared",
            size: "XL",
            color: "White",
            displayName: "Rahul",
          },
        },
        {
          id: "TS-4",
          createdDate: "10/05/2026 10:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            type: "round",
            size: "L",
            color: "Green",
            displayName: "R",
          },
        },
      ],
      sponsorships: [
        {
          id: "SP-2",
          createdDate: "10/05/2026 10:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {},
        },
      ],
    },
  ],
  "1001": [],
};

export const mockPartnerRegistrationsDb: Record<string, Order[]> = {
  "3434": [
    {
      orderId: "ORD-1",
      transactionId: "TXN-1",
      paymentStatus: "SUCCESS",
      totalOrderAmount: {
        orderAmount: 1000,
        platformFee: 20,
      },
      registrations: [
        {
          id: "REG-1",
          createdDate: "10/05/2026 09:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Abhishek",
          additionalAttributes: {
            categoryName: "Singles",
            categoryCode: "001",
          },
        },
      ],
    },
    {
      orderId: "ORD-99",
      transactionId: "TXN-99",
      paymentStatus: "SUCCESS",
      totalOrderAmount: {
        orderAmount: 1000,
        platformFee: 20,
      },
      registrations: [
        {
          id: "REG-3",
          createdDate: "10/05/2026 11:00AM",
          amount: 1000,
          quantity: 1,
          createdBy: "Rahul",
          additionalAttributes: {
            categoryName: "Doubles",
            categoryCode: "002",
            partnerDetails: {
              fullName: "Abhishek",
              playerId: "3434",
            },
          },
        },
      ],
    },
  ],
  "1001": [],
};
