import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || ""
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || ""

export function generateTokens(userId: string, role: any, name: any) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch (error) {
    return null
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string }
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}
