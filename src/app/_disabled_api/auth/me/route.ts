import { NextRequest, NextResponse } from "next/server";
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
    const payload = verifyToken(token);

    return NextResponse.json({
      phone: payload.phone,
      playerId: payload.playerId,
      fullName: payload.fullName,
      dob: payload.dob,
      gender: payload.gender,
      role: payload.role,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
