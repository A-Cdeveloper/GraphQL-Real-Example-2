import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { generateTokens } from "@/lib/auth/jwt";
import { loginSchema } from "@/lib/auth/validation";
import { handleRestError } from "@/lib/errors";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate data
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    // Save refresh token to database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Return success response with tokens for non-cookie clients (e.g., React Native)
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set HttpOnly cookies for browser
    response.cookies.set("jwt", accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minute from now
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: false, // Allow client-side access for refresh
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    response.cookies.set(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
      {
        httpOnly: false, // Allow client-side access
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minute from now
      }
    );

    return response;
  } catch (error) {
    return handleRestError(error, "login");
  }
}
