import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { mockOrdersDb } from "./mockData";

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

    let userOrders = mockOrdersDb[playerIdStr];

    if (!userOrders) {
      userOrders = {
        registrations: [],
        tshirts: [],
        sponsorships: [],
      };
    }

    const { searchParams } = new URL(request.url);
    const typeQuery = searchParams.get("type");

    if (typeQuery) {
      if (typeQuery === "registrations") {
        return NextResponse.json({ registrations: userOrders.registrations || [] });
      }
      if (typeQuery === "tshirts") {
        return NextResponse.json({ tshirts: userOrders.tshirts || [] });
      }
      if (typeQuery === "sponsorships") {
        return NextResponse.json({ sponsorships: userOrders.sponsorships || [] });
      }
    }

    return NextResponse.json(userOrders);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
