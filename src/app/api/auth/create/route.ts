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

    if (!body.captchaToken) {
      return NextResponse.json(
        { message: "Security check is required. Please complete the CAPTCHA." },
        { status: 400 }
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
          { message: "Security check failed. Please try again." },
          { status: 403 }
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
