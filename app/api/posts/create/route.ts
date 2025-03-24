import connectDB from "@/db/connectDb";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import cloudinary   from 'cloudinary';

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
      
      const mimeType = file.type; // Get the file's MIME type (e.g., image/jpeg, image/png)
      const base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;
      
      const uploadResult = await cloudinary.v2.uploader.upload(base64Image, {
        folder: "blog_images",
        public_id: `blog_${Date.now()}`,
        resource_type: "image",
      });

      imageUrl = uploadResult.secure_url; // Get Cloudinary URL
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
