import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { mockCheckoutResponse } from "./mockData";
import { CheckoutCartRequest } from "./types";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    verifyToken(token);

    await request.json() as CheckoutCartRequest;

    return NextResponse.json(mockCheckoutResponse);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request or expired token" },
      { status: 401 }
    );
  }
}
