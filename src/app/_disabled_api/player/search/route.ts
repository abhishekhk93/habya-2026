import { NextRequest, NextResponse } from "next/server";
import { getMockSearchResponse } from "./mockData";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Authenticate user
    verifyToken(token);

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId");
    const categoryId = searchParams.get("categoryId");

    if (!playerId || !categoryId) {
      return NextResponse.json(
        { message: "playerId and categoryId are required query parameters" },
        { status: 400 }
      );
    }

    const mockResponse = getMockSearchResponse(playerId, categoryId);

    return NextResponse.json(mockResponse, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
