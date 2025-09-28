import { GraphQLError } from "graphql";

// GraphQL errors
export const notFoundError = (message: string) => {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT_FOUND",
    },
  });
};

export const validationError = (message: string) => {
  return new GraphQLError(message, {
    extensions: {
      code: "VALIDATION_ERROR",
    },
  });
};

export const databaseError = (message: string) => {
  return new GraphQLError(message, {
    extensions: {
      code: "DATABASE_ERROR",
    },
  });
};

export const authenticationError = (
  message: string = "You need to be authenticated to access this resource"
) => {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  });
};

// Universal Prisma error handler
export function handlePrismaError(
  error: unknown,
  context: {
    operation: string;
    id?: string;
  },
  mode: "graphql" | "rest" = "graphql"
) {
  const prismaError = error as unknown as { code: string };

  // Record not found
  if (prismaError.code === "P2025") {
    const message = `${context.operation} with id ${context.id} not found`;
    if (mode === "rest") return message;
    throw notFoundError(message);
  }

  // Unique constraint violation
  if (prismaError.code === "P2002") {
    const message = `${context.operation} already exists`;
    if (mode === "rest") return message;
    throw validationError(message);
  }

  // Database connection errors
  if (
    ["P1001", "P1002", "P1003", "P1008", "P1009", "P1010"].includes(
      prismaError.code
    )
  ) {
    console.error(`Database connection error in ${context.operation}:`, error);
    const message = "Database connection failed. Please try again later.";
    if (mode === "rest") return message;
    throw databaseError(message);
  }

  // All other database errors
  console.error(`Database error in ${context.operation}:`, error);
  const message = `Failed to ${context.operation} in database`;
  if (mode === "rest") return message;
  throw databaseError(message);
}

// REST API error handler
import { NextResponse } from "next/server";

export function handleRestError(
  error: unknown,
  operation: string,
  fallbackMessage: string = "Internal server error"
) {
  // Check if it's a Prisma error
  const prismaError = error as unknown as { code: string };
  if (prismaError.code && prismaError.code.startsWith("P")) {
    const errorMessage = handlePrismaError(error, { operation }, "rest");
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  // All other errors
  console.error(`${operation} error:`, error);
  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}
