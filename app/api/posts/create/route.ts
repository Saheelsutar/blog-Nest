import connectDB from "@/db/connectDb";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Fetch token from cookies
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorName = formData.get("authorName") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content || !authorName) {
      return NextResponse.json({ message: "Title,author name and content are required" }, { status: 400 });
    }

    let imageUrl = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Ensure directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newPost = new Post({
      title,
      content,
      authorName,
      authorId: decoded.userId,
      image: imageUrl,
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
