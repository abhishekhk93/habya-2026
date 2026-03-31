import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { mockRegistrations } from "./mockData";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Verify the user is properly logged in & parse payload mapping
    const payload = verifyToken(token);

    // Safely enforce string typing globally against the payload
    const profileIdStr = String(payload.profileId || "1001");

    // Find mock data for the specifically authenticated user
    let userData = mockRegistrations.find(u => String(u.userId) === profileIdStr);

    if (!userData) {
      // Fallback fallback: if they login with a brand new profileId not in our mock array, render them a default blank registration state.
      userData = {
        userId: profileIdStr,
        eligibleEvents: mockRegistrations[0].eligibleEvents.map(event => ({
          ...event,
          registration: {
            isRegistered: false,
            partner: null
          }
        }))
      } as any;
    }

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
