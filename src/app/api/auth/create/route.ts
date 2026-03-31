import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.gender || !body.dob) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Dummy user response matching the login payload
    const user = {
      profileId: Math.floor(Math.random() * 100000), // Random simulated ID
      name: body.name,
      role: "player" as const,
    };

    const token = signToken({
      profileId: user.profileId,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(user, { status: 200 });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
