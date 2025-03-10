import connectDB from "@/db/connectDb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const postId =searchParams.get("id");
    const authorId = searchParams.get("author");

    // Fetch a single post by ID
    if (postId) {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ message: "Invalid Post ID" }, { status: 400 });
      }
      const post = await Post.findById(postId);
      if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ post }, { status: 200 });
    }

    // Fetch posts by author ID
    if (authorId) {
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return NextResponse.json({ message: "Invalid Author ID" }, { status: 400 });
      }
      const posts = await Post.find({ authorId: new mongoose.Types.ObjectId(authorId) });
      return NextResponse.json({ posts }, { status: 200 });
    }

    // Fetch all posts (if no ID or author is provided)
    const allPosts = await Post.find();
    return NextResponse.json({ posts: allPosts }, { status: 200 });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
