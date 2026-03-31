import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";
import { authenticate } from "./service";
import { LoginRequest } from "./types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    if (!body.name || !body.password) {
      return NextResponse.json(
        { message: "Name and password are required" },
        { status: 400 }
      );
    }

    const user = authenticate(body);

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
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
