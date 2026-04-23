import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { CheckoutCartRequest } from "./types";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

function calculateAmount(body: CheckoutCartRequest) {
  return body.items.reduce((sum, item) => {
    return sum + (item.itemAmount || 0) * (item.itemQuantity || 1);
  }, 0);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    verifyToken(token);

    const body = (await request.json()) as CheckoutCartRequest;

    // 👉 Calculate total amount (INR → paise)
    const totalAmount = calculateAmount(body); // implement below

    // 👉 Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `ORD_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.receipt,
      razorpayOrderId: order.id, // ✅ REAL ORDER ID
      paymentStatus: "PENDING",
      transactionId: null,
      totalOrderAmount: {
        orderAmount: totalAmount,
        platformFee: Math.round(totalAmount * 0.02),
      },
      items: body.items,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Checkout failed" },
      { status: 500 }
    );
  }
}