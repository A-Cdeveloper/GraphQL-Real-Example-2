import jwt from "jsonwebtoken";
import { env } from "../env";

const JWT_SECRET = env.JWT_SECRET;
const REFRESH_SECRET = env.REFRESH_SECRET;

export const generateTokens = (uid: string, email: string) => {
  const accessToken = jwt.sign({ uid, email }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ uid }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as { uid: string; email: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
