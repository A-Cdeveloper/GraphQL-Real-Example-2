// Simple environment validation
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
};

// Check if all required variables exist
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Check JWT secrets length
if (requiredEnvVars.JWT_SECRET!.length < 32) {
  console.error("❌ JWT_SECRET must be at least 32 characters");
  throw new Error("JWT_SECRET must be at least 32 characters");
}

if (requiredEnvVars.REFRESH_SECRET!.length < 32) {
  console.error("❌ REFRESH_SECRET must be at least 32 characters");
  throw new Error("REFRESH_SECRET must be at least 32 characters");
}

export const env = requiredEnvVars as {
  DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  NODE_ENV: string;
  NEXT_PUBLIC_CLIENT_URL: string;
};
