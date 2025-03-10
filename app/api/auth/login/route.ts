import connectDB from "@/db/connectDb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    
   const response = NextResponse.json({ message: "Login successful",email:email }, { status: 200 });
   response.headers.set(
     "Set-Cookie",
     `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
   );

   return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
