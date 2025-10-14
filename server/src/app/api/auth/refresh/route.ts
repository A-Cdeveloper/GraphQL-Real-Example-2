import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateTokens } from "@/lib/auth/jwt";
import { refreshSchema } from "@/lib/auth/validation";
import { handleRestError } from "@/lib/errors";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate data
    const result = refreshSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { refreshToken } = result.data;

    // Check refresh token in database
    const user = await prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id,
      user.email
    );

    // Update refresh token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Return response with both tokens for mobile
    const response = NextResponse.json({
      accessToken,
      refreshToken: newRefreshToken,
    });

    // Set HttpOnly cookie for browser
    response.cookies.set("jwt", accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: false, // Allow client-side access for refresh
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return response;
  } catch (error) {
    return handleRestError(error, "refresh token");
  }
}
