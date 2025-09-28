import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { refreshSchema } from "@/lib/auth/validation";
import { handleRestError } from "@/lib/errors";

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

    // Delete refresh token from database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });

    // Return response
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    // Delete cookie
    response.cookies.delete("jwt");

    return response;
  } catch (error) {
    return handleRestError(error, "logout");
  }
}
