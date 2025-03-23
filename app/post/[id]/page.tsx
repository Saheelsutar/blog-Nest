"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorName:string
  image?: string;
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("iD:"+id)
        const res = await fetch(`/api/posts?id=${id}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.post);
        } else {
          console.error("Error fetching post:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="text-center p-10 min-h-screen bg-slate-950 text-white text-lg">Loading...</div>;
  if (!post) return <p className="text-center text-lg mt-10">Post not found.</p>;

  return (
    <div className="relative h-auto bg-slate-950 min-h-screen ">
      <div className="absolute bottom-0 h-full w-full left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className=" w-full flex justify-center relative p-6 items-center">
    <div className="mx-auto md:p-6 p-2 bg-gray-300 shadow-md  md:mt-10 mt-5 md:w-3/4 ">
      {/* Post Image */}
      {post.image && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Post Title */}
      <h1 className="md:text-3xl text-2xl font-bold">{post.title}</h1>

      {/* Author */}
      <p className="text-gray-600 text-sm mt-2 font-semibold">By: {post.authorName}</p>

      {/* Content */}
      <p className="text-gray-700 mt-4 max-md:text-sm leading-relaxed">{post.content}</p>
    </div>
    </div>
    </div>
  );
};

export default PostPage;
