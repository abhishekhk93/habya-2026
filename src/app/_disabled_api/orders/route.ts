import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { mockOrdersDb, mockPartnerRegistrationsDb } from "./mockData";
import { Order } from "./types";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const payload = verifyToken(token);
    const playerIdStr = String(payload.playerId || "1001");

    const { searchParams } = new URL(request.url);
    const typeQuery = searchParams.get("type");
    const includePartnerRegistrations = searchParams.get("includePartnerRegistrations");

    if (typeQuery === "registrations" && includePartnerRegistrations === "true") {
       let partnerOrders = mockPartnerRegistrationsDb[playerIdStr] || [];
       return NextResponse.json(partnerOrders);
    }

    let userOrders = mockOrdersDb[playerIdStr] || [];

    return NextResponse.json(userOrders);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
