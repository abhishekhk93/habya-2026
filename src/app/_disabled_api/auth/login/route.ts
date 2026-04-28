import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";
import { authenticate } from "./service";
import { LoginRequest } from "./types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    if (!body.phone || !body.password) {
      return NextResponse.json(
        { message: "Phone and password are required" },
        { status: 400 }
      );
    }

    const user = authenticate(body);

    const token = signToken({
      phone: user.phone,
      playerId: user.playerId,
      fullName: user.fullName,
      dob: user.dob,
      gender: user.gender,
      role: user.role || "player",
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
      { 
        errorCode: "ERR_003",
        errorMessage: "Incorrect password" 
      },
      { status: 401 }
    );
  }
}
