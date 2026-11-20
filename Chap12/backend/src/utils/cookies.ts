import type { Response } from "express";
import { prisma } from "../db.js";

export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie("refreshToken");
}

export async function cealnupExpiredTokens() {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    }
  });
  return result.count;
}
