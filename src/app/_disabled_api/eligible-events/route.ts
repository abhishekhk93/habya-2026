import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { dummyEligibleCategories } from "./mockData";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    // We just verify the token is valid, no need to strictly filter events by playerId
    // for this mock, since the user provided a generic response.
    verifyToken(token);

    return NextResponse.json(dummyEligibleCategories);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
