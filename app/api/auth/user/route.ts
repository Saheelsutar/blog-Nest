import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return NextResponse.json({ userId: decoded.userId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token",error }, { status: 401 });
  }
}
