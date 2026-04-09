import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.phone || !body.gender || !body.dob) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (body.phone === "9999999999" || body.phone === "9740379533") {
      // Mocking already registered user. Let's assume 9740379533 is already registered because "already registered" is in error list. But wait, he passed 9740379533 in signup request success! So let's mock 9999999999 as already registered.
      // Wait, let's just make sure we handle the mock properly! A known duplicate.
      if (body.phone === "9999999999") {
        return NextResponse.json(
          { errorCode: "ERR_002", errorMessage: "Phone number already registered" },
          { status: 400 }
        );
      }
    }

    if (!body.captchaToken) {
      return NextResponse.json(
        { errorCode: "ERR_001", errorMessage: "Invalid captcha code" },
        { status: 401 }
      );
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
          response: body.captchaToken,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        return NextResponse.json(
          { errorCode: "ERR_001", errorMessage: "Invalid captcha code" },
          { status: 401 }
        );
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return NextResponse.json(
          { message: "Security check timed out. Please try again." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Security check service unavailable. Please try again later." },
        { status: 400 }
      );
    }

    // Dummy user response matching the login payload
    const generatedPlayerId = "3434"; // Fixed based on request example
    const user = {
      phone: body.phone,
      playerId: generatedPlayerId,
      fullName: body.fullName,
      dob: body.dob,
      gender: body.gender,
      role: "player" as const,
    };

    const token = signToken({
      phone: user.phone,
      playerId: user.playerId,
      fullName: user.fullName,
      dob: user.dob,
      gender: user.gender,
      role: user.role,
    });

    const response = NextResponse.json({
      playerId: user.playerId,
      fullName: user.fullName
    }, { status: 200 });

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
