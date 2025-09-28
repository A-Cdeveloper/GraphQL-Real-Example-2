// Simple environment validation
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Check if all required variables exist
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

// Check JWT secrets length
if (requiredEnvVars.JWT_SECRET!.length < 32) {
  console.error("❌ JWT_SECRET must be at least 32 characters");
  process.exit(1);
}

if (requiredEnvVars.REFRESH_SECRET!.length < 32) {
  console.error("❌ REFRESH_SECRET must be at least 32 characters");
  process.exit(1);
}

export const env = requiredEnvVars as {
  DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  NODE_ENV: string;
};
