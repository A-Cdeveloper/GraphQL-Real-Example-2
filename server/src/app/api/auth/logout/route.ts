import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logoutSchema } from "@/lib/auth/validation";
import { handleRestError } from "@/lib/errors";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body = {};
    try {
      body = await request.json();
    } catch {
      // Body is optional for web clients using cookies
    }

    const result = logoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { refreshToken: bodyRefreshToken } = result.data;
    const cookieRefreshToken = request.cookies.get("refreshToken")?.value;
    const refreshToken = bodyRefreshToken || cookieRefreshToken;

    if (refreshToken) {
      // Revoke refresh token in DB if it matches any user
      await prisma.user.updateMany({
        where: { refreshToken },
        data: { refreshToken: null },
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear all auth cookies for web clients
    response.cookies.set("jwt", "", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: false, // Match the login route setting
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    response.cookies.set("user", "", {
      httpOnly: false,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return handleRestError(error, "logout");
  }
}
