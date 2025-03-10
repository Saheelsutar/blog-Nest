import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  userId: string;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload; // Explicitly cast type
  } catch{
    return null;
  }
}
